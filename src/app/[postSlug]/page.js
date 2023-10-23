import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '../../helpers/file-helpers';
import styles from './postSlug.module.css';

async function BlogPost({ params: { postSlug } }) {
  const {
    frontmatter: { title, publishedOn },
    content,
  } = await loadBlogPost(postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
