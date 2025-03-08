import Banner from "@/components/Banner";
import ContentRowContainer from "@/components/ContentRowContainer";
import ContentSection from "@/components/ContentSection";
import consulting from '@/data/consulting.json';
import { GetStaticProps } from "next";
import { ListItem } from "@/data/data-type";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{ consulting: ListItem[] }> = async () => {
    return {
        props: {
            consulting: consulting.consulting
        }
    };
}

export default function Consulting({ consulting }: { consulting: ListItem[] }) {

    const pageData = {
        banner: {
            imageUrl: "/banner.png",
            title: "给您专业的建议和解决方案"
        }
    }

    return (
        <div>
            <Banner
                imageUrl={pageData.banner.imageUrl}
                title={pageData.banner.title}
            />
            <div className="h-[16px]" />
            <ContentRowContainer numOfCols={1}>
                <ContentSection
                    title="产品咨询"
                    hasMore={false}
                >
                    <div>
                        {consulting.map((consulting) => (
                            <ul key={consulting.id} className="gap-2 border-b border-gray-200 pb-4 pt-4">
                                <li className="list-disc list-inside">
                                    <Link href={consulting.href} className="text-gray-800 hover:text-blue-600">
                                        {consulting.text}
                                        <span className="text-gray-500"> （付费：{consulting.price}元）</span>
                                    </Link>
                                </li>
                            </ul>
                        ))}
                    </div>
                </ContentSection>
            </ContentRowContainer>
        </div>
    );
}

