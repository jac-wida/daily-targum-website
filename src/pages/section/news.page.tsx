import * as React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import { Section, Grid, LoadMoreButton, ActivityIndicator, Card2, CardCols, Banner, SEOProps, Ad, Semantic } from '../../components';
import { imgix } from '../../utils';
import { formatDateAbriviated, extractTextFromHTML } from '../../shared/src/utils';
import { useRouter } from 'next/router';
import { useArticles } from '../../machines';
import { theme } from '../../constants';
import Styles from './news.styles';
const { StyleSheet, classNames } = Styles;

function News({ 
  initialArticles
}: { 
  initialArticles: GetArticles
}) {
  const { articles, loadMore, loading } = useArticles({ 
    initialArticles,
    category: 'News'
  });

  const router = useRouter();

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  return (
    <>
      <Section className={classNames.page}>
        <Semantic role='main' pritable skipNavContent>
          <Grid.Row 
            spacing={theme.spacing(1)}
          >
            <Grid.Col xs={24}>
              <Banner 
                text='News'
                className={classNames.banner}
              />
            </Grid.Col>
            
            <CardCols 
              items={articles.slice(0,2)}
            >
              {article => {
                if (!article) {
                  return null;
                }

                return (
                  <Card2.Image
                    id={article.id}
                    title={article.title}
                    imageData={imgix(article.media[0]?.url ?? '', {
                      xs: imgix.presets.sm('1:1'),
                      md: imgix.presets.lg('16:9')
                    })}
                    href='/article/[year]/[month]/[slug]'
                    as={'/'+article.slug}
                    date={formatDateAbriviated(article.publishDate)}
                    // aspectRatioDesktop={16 / 9}
                    author={article.authors.map(a => a.displayName).join(', ')}
                    altText={article.media[0]?.altText ?? article.media[0]?.description ?? undefined}
                    description={extractTextFromHTML(article.abstract ?? '')}
                  />
                );
              }}
            </CardCols>

            <Grid.Col xs={24}>
              <Ad type='banner'/>
            </Grid.Col>

            {articles.slice(2).map(item => (
              <Grid.Col 
                key={item.id}
                xs={24}
                md={12}
                lg={8}
                style={{height: '100%'}}
              >
                <Card2.Stacked
                  id={item.id}
                  imageData={imgix(item.media[0]?.url ?? '', {
                    xs: imgix.presets.sm('1:1'),
                    md: imgix.presets.md('16:9')
                  })}
                  title={item.title}
                  href='/article/[year]/[month]/[slug]'
                  as={'/'+item.slug}
                  date={formatDateAbriviated(item.publishDate)}
                  aspectRatio={16 / 9}
                  author={item.authors.map(a => a.displayName).join(', ')}
                  altText={item.media[0]?.altText ?? item.media[0]?.description ?? undefined}
                  description={extractTextFromHTML(item.abstract ?? '')}
                />
              </Grid.Col >
            ))}
          </Grid.Row>
        </Semantic>

        <LoadMoreButton
          handleLoad={loadMore}
          loading={loading}
        />
        
      </Section>
      {StyleSheet}
    </>
  );
}

export async function getStaticProps() {
  const initialArticles = await actions.getArticles({
    category: 'News',
    limit: 50
  });

  const seo: SEOProps = {
    title: 'News'
  };

  const firstArticle = initialArticles?.items?.[0].articles?.[0];
  if (firstArticle?.media?.[0]?.url) {
    seo.imageSrc = firstArticle.media[0].url;
  }

  return {
    props: {
      initialArticles: initialArticles ?? null,
      seo
    },
    revalidate: 60 // seconds
  }
};

export default News;