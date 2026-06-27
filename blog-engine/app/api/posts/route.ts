import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Convert spaces to single hyphens
    .replace(/-+/g, '-'); // Deduplicate sequential hyphens
};

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {

  try {
    const body = await request.json();
    const { title, image, description } = body;

    if (!title || !image || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, image, and description are required.' },
        { status: 400 }
      );
    }

    let slug = generateSlug(title);
    let post;

    try {
      // Find or create a default user since the schema requires an author
      let defaultUser = await prisma.user.findFirst();
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: {
            name: 'Kartik Jagdale',
            email: 'kartikjagdale0511@gmail.com',
          },
        });
      }

      post = await prisma.post.create({
        data: {
          title,
          slug,
          image,
          description,
          authorId: defaultUser.id,
        },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      
      if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
        // Append a unique hash to the slug
        const uniqueHash = Math.random().toString(36).substring(2, 8);
        slug = `${slug}-${uniqueHash}`;

        const defaultUser = await prisma.user.findFirst();

        post = await prisma.post.create({
          data: {
            title,
            slug,
            image,
            description,
            authorId: defaultUser!.id,
          },
        });
      } else {
        throw error;
      }
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
