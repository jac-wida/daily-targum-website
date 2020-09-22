import React from 'react';
import { actions, GetArticles } from '../../shared/src/client';
import { Section, Grid, ActivityIndicator, Card, CardCols, Banner, TagBar, Divider, SEOProps, Text, SkipNav } from '../../components';
import { imgix } from '../../utils';
import { formatDateAbriviated, chopArray } from '../../shared/src/utils';
import { useRouter } from 'next/router';
import { useSports } from '../../machines';
import styles from './sports.module.scss';
import { theme } from '../../constants';


function Category({ 
  initialArticles
}: { 
  initialArticles: GetArticles
}) {
  const router = useRouter();

  const subcategories = initialArticles.subcategories;
  const firstFiveArticles = initialArticles.items[0].articles.slice(0, 5);
  const restArticles = initialArticles.items[0].articles.slice(5);

  const { 
    selectedArticles, 
    loadMore, 
    outOfContent,
    selectedTag,
    setSelectedTag
  } = useSports({
    initialArticles: restArticles,
    subcategories
  })

  if (router.isFallback) {
    return <ActivityIndicator.Screen/>
  }

  return (
    <Section className={styles.page}>
      <Banner text='Sports'/>

      <main>
        <SkipNav.Content/>

        <Grid.Row 
          spacing={theme.spacing(2)}
          cols={['2fr', '1fr', '1fr']}
        >
          <CardCols 
            items={chopArray(firstFiveArticles, [1, 2, 2])}
          >
            {(article, i) => {
              if (!article) {
                return null;
              }

              return i === 0 ? (
                article[0] ? (
                  <Card.ImageResponsive 
                    id={article[0].id}
                    title={article[0].title}
                    imageData={imgix(article[0].media[0]?.url ?? '', {
                      xs: imgix.presets.sm('1:1'),
                      md: imgix.presets.md('4:3')
                    })}
                    href='/article/[year]/[month]/[slug]'
                    as={'/'+article[0].slug}
                    date={formatDateAbriviated(article[0].publishDate)}
                    author={article[0].authors.map(a => a.displayName).join(', ')}
                    altText={article[0].media[0]?.altText ?? article[0].media[0]?.description ?? undefined}
                  />
                ) : null
              ) : (
                <>
                  {article[0] ? (
                      <Card.ImageResponsive
                      id={article[0].id}
                      title={article[0].title}
                      imageData={imgix(article[0].media[0]?.url ?? '', {
                        xs: imgix.presets.sm('1:1'),
                        md: imgix.presets.md('3:2')
                      })}
                      href='/article/[year]/[month]/[slug]'
                      as={'/'+article[0].slug}
                      aspectRatioDesktop={3 / 2}
                      date={formatDateAbriviated(article[0].publishDate)}
                      author={article[0].authors.map(a => a.displayName).join(', ')}
                      altText={article[0].media[0]?.altText ?? article[0].media[0]?.description ?? undefined}
                    />
                  ) : null}

                  <Card.Spacer/>

                  {article[1] ? (
                    <Card.ImageResponsive
                      id={article[1].id}
                      title={article[1].title}
                      imageData={imgix(article[1].media[0]?.url ?? '', {
                        xs: imgix.presets.sm('1:1'),
                        md: imgix.presets.md('3:2')
                      })}
                      href='/article/[year]/[month]/[slug]'
                      as={'/'+article[1].slug}
                      aspectRatioDesktop={3 / 2}
                      date={formatDateAbriviated(article[1].publishDate)}
                      author={article[1].authors.map(a => a.displayName).join(', ')}
                      altText={article[1].media[0]?.altText ?? article[1].media[0]?.description ?? undefined}
                    />
                  ) : null}
                </>
              );
            }}
          </CardCols>
        </Grid.Row>
      </main>
      
      <Card.Spacer/>
      <Card.Spacer/>
      <Divider/>
      <Card.Spacer/>
      <Card.Spacer/>
      <TagBar
        // THIS IS A HACK
        tags={subcategories.sort()}
        value={selectedTag}
        onChange={setSelectedTag}
      />
      <Card.Spacer/>
      <Card.Spacer/>

      <Grid.Row 
        spacing={theme.spacing(2)}
      >
        
        {selectedArticles.map(item => item ? (
          <Grid.Col 
            key={item.id}
            xs={24}
            md={12}
            lg={8}
          >
            <Card.StackedResponsive
              imageData={imgix(item.media[0]?.url ?? '', {
                xs: imgix.presets.sm('1:1'),
                md: imgix.presets.md('16:9')
              })}
              title={item.title}
              href='/article/[year]/[month]/[slug]'
              as={'/'+item.slug}
              date={formatDateAbriviated(item.publishDate)}
              aspectRatioDesktop={16 / 9}
              author={item.authors.map(a => a.displayName).join(', ')}
              altText={item.media[0]?.altText ?? item.media[0]?.description ?? undefined}
            />
          </Grid.Col>
        ) : null)}
      </Grid.Row>
      
      {!outOfContent ? (
        <ActivityIndicator.ProgressiveLoader 
          key={selectedTag}
          onVisible={loadMore}
        />
      ) : (
        <Text style={{textAlign: 'center', display: 'block'}}>
          No {selectedArticles.length === 0 ? 'more ' : ''}articles.
        </Text>
      )}
    </Section>
  );
}

export async function getStaticProps() {
  const initialArticles = await actions.getArticles({
    category: 'Sports',
    limit: 100
  });

  const seo: SEOProps = {
    title: 'Sports'
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
  };
};

export default Category;