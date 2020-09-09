import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Section, Text, Grid, AspectRatioImage, Card, ActivityIndicator, Divider, FlatList } from '../../components';
import { actions, GetAuthorPage } from '../../shared/src/client';
import { formatDateAbriviated } from '../../shared/src/utils';
import { processNextQueryStringParam, imgix } from '../../utils';
import NotFound from '../404.page';
import { useRouter } from 'next/router';
import styles from './[slug].module.scss';
import { theme } from '../../constants';

function Author({
  page
}: {
  page: GetAuthorPage | null
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>;
  }

  if (!page) {
    return <NotFound/>;
  }

  return (
    <Section className={styles.page}>
      <Grid.Row spacing={theme.spacing(2)}>

        <Grid.Col xs={0} md={6} lg={5}>
          <div className={styles.authorCard}>
            <Text.Br/>
            {page.author.headshot ? (
              <AspectRatioImage
                data={imgix(page.author.headshot, {
                  xs: imgix.presets.sm('1:1')
                })}
                aspectRatio={1}
                className={styles.avatar}
              />
            ) : null}
            <Text variant='h3'>{page.author.displayName}</Text>
            <Text variant='p'>{page.author.bio}</Text>
          </div>
        </Grid.Col>

        <Grid.Col xs={24} md={0}>
          {page.author.headshot ? (
            <Card.Compact
              href='#'
              className={styles.articleCard}
              title={page.author.displayName}
              imageData={imgix(page.author.headshot ?? '', {
                xs: imgix.presets.sm('1:1')
              })}
              aspectRatio={3 /2}
            />
          ) : (
            <Text variant='h3'>{page.author.displayName}</Text>
          )}

          <Card.Spacer/>
          <Divider/>
        </Grid.Col>

        <Grid.Col xs={24} md={18} lg={14}>
          <FlatList
            data={page.articles}
            keyExtractor={article => article.id}
            renderItem={article => (
              <Card.Compact
                className={styles.articleCard}
                title={article.title}
                imageData={imgix(article.media[0]?.url ?? '', {
                  xs: imgix.presets.md('1:1')
                })}
                href='/article/[year]/[month]/[slug]'
                as={'/'+article.slug}
                aspectRatio={3 / 2}
                date={formatDateAbriviated(article.publishDate)}
              />
            )}
            ItemSeparatorComponent={<Card.Spacer/>}
          />
          {/* <ActivityIndicator.ProgressiveLoader
            onVisible={() => console.log('implement progressive load')}
          /> */}
        </Grid.Col>

      </Grid.Row>
    </Section>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const page = await actions.getAuthorBySlug({
    slug: processNextQueryStringParam(ctx.params?.slug, '')
  });

  // TODO: add seo

  return {
    props: { 
      page: page ?? null
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () =>  {
  return {
    paths: [],
    fallback: true
  };
}

export default Author;