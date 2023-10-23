import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';
import CircularColorsDemo from '../../components/CircularColorsDemo';
import CodeSnippet from '../../components/CodeSnippet';
import Spinner from '../../components/Spinner';
import { loadBlogPost } from '../../helpers/file-helpers';
import styles from './postSlug.module.css';

const DivisionGroupsDemo = dynamic(() => import('../../components/DivisionGroupsDemo'), {
  loading: Spinner,
});

export async function generateMetadata({ params: { postSlug } }) {
  const {
    frontmatter: { title, abstract },
  } = await loadBlogPost(postSlug);

  return {
    title: `${title} • Bits & Bytes`,
    description: abstract,
  };
}

async function BlogPost({ params: { postSlug } }) {
  const {
    frontmatter: { title, publishedOn },
    content,
  } = await loadBlogPost(postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{ pre: CodeSnippet, DivisionGroupsDemo, CircularColorsDemo }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
