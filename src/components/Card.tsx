import React from 'react';
import Link from 'next/link';
import Theme from './Theme';
import Text from './Text';
import Grid from './Grid/web';
import { AspectRatioImage } from './AspectRatioView';
import { ImageData } from './Image';
import { styleHelpers } from '../utils';

function CardCompact({
  title,
  subtitle,
  tag,
  imageData,
  href,
  as,
  aspectRatio = 1,
  date,
  className,
  style
}: {
  title?: string
  subtitle?: string
  tag?: string
  imageData: ImageData[]
  href?: string
  as?: string
  aspectRatio?: number
  date?: string,
  className?: string
  id?: string,
  style?: React.CSSProperties
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Link
      href={href||''}
      as={as}
    >
      <a style={styles.cardLink}>
        <div 
          style={{
            ...styles.compactCard,
            ...style
          }} 
          className={className}
        >
          <AspectRatioImage
            style={styles.compactCardImage}
            aspectRatio={aspectRatio}
            data={imageData}
          />
          

          <div style={styles.compactCardBody}>
            {tag ? <Text style={styles.tag}>{tag}</Text> : null}
            {title ? <Text.Truncate variant='h4' htmlTag='h1' numberOfLines={3} lockNumberOfLines={true}>{title}</Text.Truncate> : null}
            {subtitle ? <Text.Truncate numberOfLines={3} noPadding>{subtitle}</Text.Truncate> : null}
            {date ? <Text style={styles.date}>{date}</Text> : null}
          </div>
        </div>
      </a>
    </Link>
  );
}

function CardCompactResponsive({
  title,
  subtitle,
  tag,
  imageData,
  href,
  as,
  aspectRatioMobile,
  aspectRatioDesktop,
  date,
  className,
  author
}: {
  title?: string
  subtitle?: string
  tag?: string
  imageData: ImageData[]
  href?: string
  as?: string
  aspectRatioMobile?: number
  aspectRatioDesktop?: number
  date?: string,
  className?: string,
  id?: string
  author?: string
}) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Link
      href={href||''}
      as={as}
    >
      <a style={styles.cardLink}>
        <div 
          style={styles.compactCard} 
          className={className}
        >
          <Grid.Display 
            xs={false}
            md={true}
            style={styles.compactCardImage}
          >
            <AspectRatioImage
              aspectRatio={aspectRatioDesktop}
              data={imageData}
            />
          </Grid.Display>
          {/* Mobile */}
          <Grid.Display 
            xs={true}
            md={false}
            style={styles.compactCardImage}
          >
            <AspectRatioImage
              aspectRatio={aspectRatioMobile}
              data={imageData}
            />
          </Grid.Display>

          <div style={styles.compactCardBody}>
            {tag ? <Text style={styles.tag}>{tag}</Text> : null}
            {title ? <Text.Truncate variant='h4' htmlTag='h1' numberOfLines={3} lockNumberOfLines={true}>{title}</Text.Truncate> : null}
            {subtitle ? <Text.Truncate numberOfLines={3} noPadding>{subtitle}</Text.Truncate> : null}
            {date ? <Text style={styles.date}><Text style={{color: '#cc0033'}}>{author ? author+' ' : ''}</Text>{date}</Text> : null}
          </div>
        </div>
      </a>
    </Link>
  );
}

type CardStackedProps = {
  title?: string
  subtitle?: string
  tag?: string
  imageData: ImageData[]
  href: string
  as?: string
  aspectRatio?: number
  date?: string,
  id?: string
}

function CardStacked({
  title,
  subtitle,
  tag,
  imageData,
  href,
  as,
  aspectRatio,
  date
}: CardStackedProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Link
      href={href}
      as={as}
    >
      <a style={styles.stackedCard}>
        <AspectRatioImage
          aspectRatio={aspectRatio}
          data={imageData}
        />
        
        <div style={styles.stackedCardBody}>
          {tag ? <Text style={styles.tag}>{tag}</Text> : null}
          {title ? <Text.Truncate variant='h4' htmlTag='h1' numberOfLines={2} lockNumberOfLines={true}>{title}</Text.Truncate> : null}
          {subtitle ? <Text.Truncate numberOfLines={2} noPadding>{subtitle}</Text.Truncate> : null}
          {date ? <Text style={styles.date}>{date}</Text> : null}
        </div>
      </a>
    </Link>
  );
}

interface CardStackedResponsiveProps extends CardStackedProps {
  aspectRatioCompact?: number
  aspectRatioStacked?: number
  tag?: string
}

export function CardStackedResponsive({
  aspectRatioCompact,
  aspectRatioStacked,
  ...rest
}: CardStackedResponsiveProps) {
  return (
    <>
      {/* Desktop */}
      <Grid.Display 
        xs={false}
        md={true}
      >
        <CardStacked
          {...rest}
          aspectRatio={aspectRatioStacked ?? rest.aspectRatio}
        />
      </Grid.Display>

      {/* Mobile */}
      <Grid.Display 
        xs={true}
        md={false}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioCompact ?? rest.aspectRatio}
        />
      </Grid.Display>
    </>
  )
}

type CardImageProps = {
  title?: string
  imageData: ImageData[]
  href: string
  as?: string
  aspectRatio?: number
  date?: string
  id?: string
}

function CardImage({
  title,
  imageData,
  href,
  as,
  aspectRatio,
  date
}: CardImageProps) {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <Link
      href={href}
      as={as}
    >
      <a 
        style={{
          ...styles.imageCard,
          ...(aspectRatio ? null : {
            flex: 1,
            height: '100%'
          })
        }}
      >
        <AspectRatioImage
          aspectRatio={aspectRatio}
          data={imageData}
        />

        <div style={styles.imageCardOverlay}/>
        <div style={styles.imageCardTitleWrap}>
          {title ? <Text.Truncate variant='h3' htmlTag='h1' numberOfLines={2} style={styles.imageCardTitle}>{title}</Text.Truncate> : null}
          {date ? <Text style={styles.imageCardSubtitle}>{date}</Text> : null}
        </div>
      </a>
    </Link>
  );
}

interface CardImageResponsiveProps extends CardImageProps {
  aspectRatioCompact?: number
  aspectRatioImage?: number
  tag?: string
}

function CardImageResponsive({
  aspectRatioCompact,
  aspectRatioImage,
  ...rest
}: CardImageResponsiveProps) {
  return (
    <>
      {/* Desktop */}
      <Grid.Display 
        xs={false}
        md={true}
        style={{ height: '100%' }}
      >
        <CardImage
          {...rest}
          aspectRatio={aspectRatioImage ?? rest.aspectRatio}
        />
      </Grid.Display>

      {/* Mobile */}
      <Grid.Display 
        xs={true}
        md={false}
      >
        <CardCompact
          {...rest}
          aspectRatio={aspectRatioCompact ?? rest.aspectRatio}
        />
      </Grid.Display>
    </>
  )
}

function CardSpacer() {
  const styles = Theme.useStyleCreator(styleCreator);
  return (
    <div style={styles.spacer}/>
  )
}

const styleCreator =  Theme.makeStyleCreator(theme => ({  
  stackedCard: {
    ...styleHelpers.hideLink(),
    ...styleHelpers.flex(),
    flex: 1,
    ...styleHelpers.card(theme)
  },
  compactCard: {
    ...styleHelpers.flex('row'),
    ...styleHelpers.card(theme),
    flex: 1
  },
  compactCardImage: {
    ...styleHelpers.lockWidth('40%')
  },
  stackedCardBody: {
    ...styleHelpers.flex('column'),
    ...styleHelpers.cardBody(theme),
    flex: 1,
    alignItems: 'flex-start',
  },
  compactCardBody: {
    ...styleHelpers.flex('column'),
    ...styleHelpers.cardBody(theme),
    flex: 1,
    alignItems: 'flex-start',
  },
  imageCard: {
    ...styleHelpers.card(theme),
    border: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    ...styleHelpers.centerBackgroundImage()
  },
  backgroundImgae: {
    height: '100%',
    display: 'flex',
    ...styleHelpers.centerBackgroundImage()
  },
  imageCardOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), transparent)'
  },
  imageCardTitle: {
    color: '#fff'
  },
  imageCardSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: theme.spacing(1)
  },
  imageCardTitleWrap: {
    position: 'absolute',
    bottom: 0,
    padding: theme.spacing(2)
  },
  tag: {
    display: 'flex',
    color: '#fff',
    backgroundColor: theme.colors.accent,
    padding: theme.spacing(0.5, 1),
    marginBottom: theme.spacing(1),
  },
  cardLink: {
    ...styleHelpers.hideLink(),
    display: 'flex',
    flex: 1
  },
  date: {
    color: theme.colors.textMuted
  },
  spacer: {
    height: theme.spacing(2)
  }
}));

const comparisonFn = function(prevProps: any, nextProps: any) {
  return prevProps.id === nextProps.id;
};

export const Card = {
  Compact: React.memo(CardCompact, comparisonFn),
  CompactResponsive: React.memo(CardCompactResponsive, comparisonFn),
  Stacked: React.memo(CardStacked, comparisonFn),
  StackedResponsive: React.memo(CardStackedResponsive, comparisonFn),
  Image: React.memo(CardImage, comparisonFn),
  ImageResponsive: React.memo(CardImageResponsive, comparisonFn),
  Spacer: React.memo(CardSpacer, comparisonFn)
}

export default Card;