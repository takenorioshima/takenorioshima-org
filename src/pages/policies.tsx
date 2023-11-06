import Layout from "../components/layouts/posts";
import { SITE_NAME, AUTHOR_PROFILES } from "../lib/constants";
import React, { Suspense } from "react";
import Link from "next/link";
import Container from "../components/container";
import { NextSeo } from "next-seo";

export default function Policies() {
  const title = `プライバシーポリシー - ${SITE_NAME}`;

  return (
    <>
      <Layout>
        <NextSeo title={title} />
        <Container>
          <h2 className="text-2xl font-bold text-center tracking-tighter md:pr-8 py-10 mt-20">
            <i className="bi bi-shield-lock-fill"></i> プライバシーポリシー
          </h2>
          <div className=" max-w-75 mx-auto prose prose-h2:font-semibold prose-p:leading-7 before:prose-code:hidden after:prose-code:hidden mb-20">
            <h3 className="mt-18 mb-5">Google Analytics について</h3>
            <p>
              当Webサイトではアクセスログの収集・分析に Google Analytics を使用しています。Google Analytics
              ではクッキーを利用し個人を特定する情報を含まずにログを収集します。なお、収集されるログはGoogle社のプライバシーポリシーに基づいて管理されます。Google
              Analytics 利用規約、および Google のプライバシーポリシーなどについては以下をご覧ください。
            </p>
            <ul className="leading-loose">
              <li>
                <Link href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank">
                  Google Analytics 利用規約
                </Link>
              </li>
              <li>
                <Link href="https://policies.google.com/privacy?hl=ja" target="_blank">
                  Google プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank">
                  Google ポリシーと規約
                </Link>
              </li>
              <li>
                <Link href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank">
                  Google Analytics オプトアウト アドオン
                </Link>
              </li>
            </ul>

            <h3 className="mt-18 mb-5">免責事項</h3>
            <p>
              当Webサイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
            </p>
            <p>
              また当Webサイトのコンテンツや情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。
            </p>
            <p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>

            <h3 className="mt-18 mb-5">著作権について</h3>
            <p>
              当Webサイトに掲載している文章や画像などの無断転載は禁止します。引用については、著作権法第32条に定められた引用の範囲内で自由に行っていただけます。
            </p>
            <p>
              当Webサイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、
              <Link href={AUTHOR_PROFILES.links.twitter.url} className="mx-1" target="_blank">
                X
              </Link>
              や
              <Link
                href={AUTHOR_PROFILES.links.github.url + "/takenorioshima-org/issues"}
                className="mx-1"
                target="_blank"
              >
                GitHub Issues
              </Link>
              でご報告ください。
            </p>
          </div>
        </Container>
      </Layout>
    </>
  );
}
