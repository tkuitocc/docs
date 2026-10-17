import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/en-US"
          >English</Link>
          <Link
            className="button button--secondary button--lg"
            to="/zh-Hant-TW"
          >華語 - 傳統漢字</Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`TKUITOCC 淡江大學資訊科技及開放文化社群`}
      description="Tamkang University Information Technology and Open Culture Community"
    >
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
