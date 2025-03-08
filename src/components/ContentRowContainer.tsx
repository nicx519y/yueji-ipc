interface Props {
    children: React.ReactNode;
    numOfCols?: 1 | 2 | 3 | 4;
}

export default function ContentRowContainer({ children, numOfCols = 2 }: Props) {
    // 使用对象映射来处理动态类名
    const gridColsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4'
    }[numOfCols];

    return (
        <div className="bg-white rounded-lg px-4 py-4 shadow-md">
            <div className={`grid gap-4 ${gridColsClass}`}>
                {children}
            </div>
        </div>
    );
} 