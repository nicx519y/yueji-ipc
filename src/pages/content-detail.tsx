import { useRouter } from 'next/router';
import ContentRowContainer from "@/components/ContentRowContainer";
import { useEffect, useState } from 'react';
import styles from '@/styles/ContentDetail.module.css';

interface ContentData {
    title: string;
    content: string;
}

export default function ContentDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [content, setContent] = useState<ContentData | null>(null);

    useEffect(() => {
        async function loadContent() {
            if (!id) return;
            
            try {
                // 动态导入内容文件
                const contentData = await import(`@/data/contents/${id}.json`);
                setContent(contentData);
            } catch (error) {
                console.error('内容加载失败:', error);
                router.push('/404');
            }
        }

        loadContent();
    }, [id, router]);

    if (!content) {
        return <div>加载中...</div>;
    }

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

