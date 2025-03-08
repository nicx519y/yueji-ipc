import type { GetStaticProps } from 'next';
import Banner from "@/components/Banner";
import ContentRowContainer from "@/components/ContentRowContainer";
import ContentSection from "@/components/ContentSection";
import Link from "next/link";
import { ListItem, SectionItem } from '@/data/data-type';
import solutions from '@/data/solutions.json';
import services from '@/data/services.json';
import reports from '@/data/reports.json';
import consulting from '@/data/consulting.json';

interface HomeProps {
  solutions: ListItem[];
  services: ListItem[];
  reports: ListItem[];
  consulting: ListItem[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      solutions: solutions.solutions,
      services: services.services,
      reports: reports.reports,
      consulting: consulting.consulting,
    },
  };
};

export default function Home({ solutions, services, reports, consulting }: HomeProps) {
  const pageData = {
    banner: {
      imageUrl: "/banner.png",
      title: "给您专业的建议和解决方案"
    },
    sections: [
      {
        row: 1,
        content: [
          {
            title: "行业方案",
            linkHref: "/solutions",
            items: solutions.map(item => ({
              text: item.text,
              href: item.href,
              price: undefined
            } as SectionItem))
          },
          {
            title: "专业服务",
            linkHref: "/services",
            items: services.map(item => ({
              text: item.text,
              href: item.href,
              price: undefined
            } as SectionItem))
          }
        ]
      },
      {
        row: 2,
        content: [
          {
            title: "市场报告",
            linkHref: "/reports",
            items: reports.map(item => ({
              text: item.text,
              href: item.href,
              price: undefined
            } as SectionItem))
          },
          {
            title: "产品咨询",
            linkHref: "/consulting",
            items: consulting.map(item => ({
              text: item.text,
              href: item.href,
              price: item.price
            } as SectionItem))
          }
        ]
      }
    ]
  };

  return (
    <div>
      <Banner
        imageUrl={pageData.banner.imageUrl}
        title={pageData.banner.title}
      />
      <div className="h-[16px]" />
      {pageData.sections.map((section, index) => (
        <div key={section.row}>
          <ContentRowContainer>
            {section.content.map((item) => (
              <ContentSection
                key={item.title}
                title={item.title}
                linkHref={item.linkHref}
              >
                <ul className="space-y-2 px-4">
                  {item.items.map((listItem, i) => (
                    <li key={i} className="hover:text-purple-600 text-sm list-disc ">
                      <div className="overflow-hidden text-ellipsis text-nowrap">
                        <Link
                          href={listItem.href}
                          className="hover:text-purple-600 "
                        >
                          {listItem.text}
                          {listItem.price !== undefined && (
                            <span className="text-sm text-red-500">
                              (付费：{listItem.price}元/篇)
                            </span>
                          )}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </ContentSection>
            ))}
          </ContentRowContainer>
          {index < pageData.sections.length - 1 && <div className="h-[16px]" />}
        </div>
      ))}
    </div>
  );
} 