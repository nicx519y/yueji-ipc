import Banner from "@/components/Banner";
import ContentRowContainer from "@/components/ContentRowContainer";
import ContentSection from "@/components/ContentSection";
import reports from '@/data/reports.json';
import { GetStaticProps } from "next";
import { ListItem } from "@/data/data-type";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{ reports: ListItem[] }> = async () => {
    return {
        props: {
            reports: reports.reports
        }
    };
}

export default function Reports({ reports }: { reports: ListItem[] }) {

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
                    title="市场报告"
                    hasMore={false}
                >
                    <div>
                        {reports.map((report) => (
                            <ul key={report.id} className="gap-2 border-b border-gray-200 pb-4 pt-4">
                                <li className="list-disc list-inside">
                                    <Link href={report.href} className="text-gray-800 hover:text-blue-600">
                                        {report.text}
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

