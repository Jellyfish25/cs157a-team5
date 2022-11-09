import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export default function DeleteMedia() {}

const getStaticProps: GetStaticProps = (context) => {
  const { mediaId } = context.params;
  return {
    props: {},
  };
};
