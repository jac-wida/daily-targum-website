import React from 'react';
import { GetStaticProps } from 'next';
import { Section, Theme, ActivityIndicator, HTML } from '../../components';
import { getPage, GetPage } from '../../shared/src/client';
import NotFound from '../404.page';
import { styleHelpers, processNextQueryStringParam } from '../../utils';
import { useRouter } from 'next/router';

function Page({
  page 
}: {
  page: GetPage | null
}) {
  const router = useRouter();
  const styles = Theme.useStyleCreator(styleCreator);

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  return page?.content ? (
    <Section style={styles.section}>
      <main>
        <HTML html={page.content}/>
      </main>
    </Section>
  ) : (
    <NotFound/>
  );
}

const styleCreator = Theme.makeStyleCreator(theme => ({
  section: {
    ...styleHelpers.page(theme),
    flex: 1
  }
}));

export const getStaticProps: GetStaticProps = async (ctx) => {  
  const page = await getPage({
    slug: processNextQueryStringParam(ctx.params?.slug)
  });

  return {
    props: {
      page: page ?? null
    },
    revalidate: 60 // seconds
  }
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export default Page;