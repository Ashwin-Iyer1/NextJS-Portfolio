import fs from "fs";
import path from "path";
import Bar from "../../components/Bar";
import "./page.css";

export default async function Page({ params }) {
  const { slug } = params;

  try {
    // Dynamically import the Markdown file
    const { default: Post } = await import(`@/content/${slug}.mdx`);

    // Wrap the Post component with Bar
    return (
      <div className="full-width-wrapper">
        <Bar />
        <div className="half-width-wrapper">
          <Post />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <p>Post not found</p>;
  }
}

// Auto-generate static paths from the content folder
export function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(contentDir);

  return filenames
    .filter((file) => file.endsWith(".mdx")) // Filter only .mdx files
    .map((file) => ({ slug: file.replace(".mdx", "") })); // Extract slug from filename
}

export const dynamicParams = false;
