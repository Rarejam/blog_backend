import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const callBlog = async () => {
  try {
    // 1. Create a user
    // const user = await prisma.user.create({
    //   data: {
    //     username: "jamal",
    //     email: "jamal@example.com",
    //     password: "securepassword",
    //     author_password: "optional_author_pass",
    //   },
    // });
    await prisma.comment.deleteMany(); // delete all comments first
    await prisma.blog.deleteMany(); // now safe to delete blogs

    // const deleteBlog = await prisma.blog.deleteMany();
    // 2. Create a blog post
    // const blog = await prisma.blog.create({
    //   data: {
    //     author: "Jamal",
    //     title: "My First Blog Post",
    //     article:
    //       "This is the article about my first blog post that I was talking about mehn",
    //   },
    // });

    // 3. Create a comment linked to both user and blog
    // const comment = await prisma.comment.create({
    //   data: {
    //     comment: "this is the first comment of the comment section",
    //     // authorId: user.id,
    //     blogId: blog.id,
    //   },
    // });

    // 4. Fetch and display results
    const comments = await prisma.comment.findMany({
      include: {
        // comment_author: true,
        blog: true,
      },
    });

    const blogs = await prisma.blog.findMany({
      include: {
        comments: true,
      },
    });

    console.log("Comments:", comments);
    console.log("Blogs:", blogs);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
};

callBlog();
