import { GetStaticProps, GetStaticPaths } from 'next';
import ContentRowContainer from "@/components/ContentRowContainer";
import styles from '@/styles/ContentDetail.module.css';
import path from 'path';
import fs from 'fs/promises';

interface ContentData {
    title: string;
    content: string;
}

interface Props {
    content: ContentData;
}

export default function ContentDetail({ content }: Props) {
    return (
        <ContentRowContainer numOfCols={1}>
            <div className="bg-white p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">{content.title}</h1>
                <div 
                    className={`prose max-w-none ${styles.contentDetail}`}
                    dangerouslySetInnerHTML={{ __html: content.content }}
                />
            </div>
        </ContentRowContainer>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const contentsDirectory = path.join(process.cwd(), 'src', 'data', 'contents');
    const filenames = await fs.readdir(contentsDirectory);
    
    const paths = filenames
        .filter(filename => filename.endsWith('.json'))
        .map(filename => ({
            params: {
                id: filename.replace(/\.json$/, '')
            }
        }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'contents', `${params?.id}.json`);
        const jsonData = await fs.readFile(filePath, 'utf8');
        const content = JSON.parse(jsonData);
        
        return {
            props: {
                content
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}; 