export default function ContentRowContainer({ children, numOfCols = 2 }: { children: React.ReactNode, numOfCols?: number }) {
  return (
    <div className="flex flex-row bg-white rounded-lg px-4 py-4 shadow-md">
      <div className={`flex-1 grid grid-cols-${numOfCols} gap-4`}>
        {children}
      </div>
    </div>
  );
} 