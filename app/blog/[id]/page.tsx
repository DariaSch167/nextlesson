import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

async function getData(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: { revalidate: 60 },
    }
  );
  return response.json();
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return { title: `Post ${id} Next App` };
}

export default async function Post({ params: { id } }: Props) {
  const post = await getData(id);
  return (
    <>
      <h1>
        Post Name {id}: {post.title}
      </h1>
      <p>{post.body}</p>
    </>
  );
}
