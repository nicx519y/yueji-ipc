import Banner from "@/components/Banner";
import ContentRowContainer from "@/components/ContentRowContainer";
import ContentSection from "@/components/ContentSection";
import { GetStaticProps } from "next";
import { ListItem } from "@/data/data-type";
import Link from "next/link";
import solutions from "@/data/solutions.json";

export const getStaticProps: GetStaticProps<{ solutions: ListItem[] }> = async () => {
    return {
        props: {
            solutions: solutions.solutions
        }
    };
}

export default function Solutions({ solutions }: { solutions: ListItem[] }) {

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
                    title="行业方案"
                    hasMore={false}
                >
                    <div>
                        {solutions.map((solution) => (
                            <ul key={solution.id} className="gap-2 border-b border-gray-200 pb-4 pt-4">
                                <li className="list-disc list-inside">
                                    <Link href={solution.href} className="text-gray-800 hover:text-blue-600">
                                        {solution.text}
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

