import Banner from "@/components/Banner";
import ContentRowContainer from "@/components/ContentRowContainer";
import ContentSection from "@/components/ContentSection";
import services from '@/data/services.json';
import { GetStaticProps } from "next";
import { ListItem } from "@/data/data-type";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{ services: ListItem[] }> = async () => {
    return {
        props: {
            services: services.services
        }
    };
}

export default function Services({ services }: { services: ListItem[] }) {

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
                    title="专业服务"
                    hasMore={false}
                >
                    <div>
                        {services.map((service) => (
                            <ul key={service.id} className="gap-2 border-b border-gray-200 pb-4 pt-4">
                                <li className="list-disc list-inside">
                                    <Link href={service.href} className="text-gray-800 hover:text-blue-600">
                                        {service.text}
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

