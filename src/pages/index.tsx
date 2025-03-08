import Banner from "@/components/Banner";
import ContentRowContainer from "@/components/ContentRowContainer";
import ContentSection from "@/components/ContentSection";
import Link from "next/link";
import Image from "next/image";

interface SectionItem {
  text: string;
  href: string;
}

interface SectionContent {
  title: string;
  linkHref: string;
  image?: string;
  items: SectionItem[];
}

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
          image: "/digital.jpg",
          items: [
            {
              text: "零售电子商务物流配送模式【收费】",
              href: "/solutions/logistics"
            },
            {
              text: "消费品分销渠道风险管理【收费】",
              href: "/solutions/risk"
            },
            {
              text: "电信竞争的形成【收费】",
              href: "/solutions/telecom"
            }
          ]
        },
        {
          title: "专业服务",
          linkHref: "/services",
          items: [
            {
              text: "中国农村耐用消费品消费数据",
              href: "/services/rural"
            },
            {
              text: "营销服务成本与绩效成本关系",
              href: "/services/marketing"
            }
          ]
        }
      ]
    },
    {
      row: 2,
      content: [
        {
          title: "市场报告",
          linkHref: "/reports",
          image: "/chart.jpg",
          items: [
            {
              text: "中国软饮料行业市场报告",
              href: "/reports/beverage"
            },
            {
              text: "北京、上海等特大城市重点零售企业调查",
              href: "/reports/retail"
            }
          ]
        },
        {
          title: "产品咨询",
          linkHref: "/consulting",
          image: "/chart.jpg",
          items: [
            {
              text: "基于用户行为的住宅卫浴产品设计研究",
              href: "/consulting/bathroom"
            },
            {
              text: "变转变为你的互联网产品经理",
              href: "/consulting/product"
            }
          ]
        }
      ]
    }
  ]
};

export default function Home() {
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
                <ul className="space-y-2">
                  {item.items.map((listItem, i) => (
                    <li key={i} className="hover:text-purple-600">
                      <Link 
                        href={listItem.href}
                        className="hover:text-purple-600"
                      >
                        {listItem.text}
                      </Link>
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