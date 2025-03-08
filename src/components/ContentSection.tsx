import Link from "next/link";

interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  linkHref?: string;
  hasMore?: boolean;
}

export default function ContentSection({ title, children, hasMore = true, linkHref = "" }: ContentSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-bold text-purple-600">{title}</h2>
        {hasMore && (
          <Link href={linkHref} className="text-sm text-gray-600 hover:text-purple-600">
            更多 {'>>'} 
          </Link>
        )}
      </div>
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm min-h-[250px]">
        {children}
      </div>
    </section>
  );
} 