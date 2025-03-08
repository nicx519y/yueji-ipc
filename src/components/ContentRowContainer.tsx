interface ContentRowContainerProps {
  children: React.ReactNode;
}

export default function ContentRowContainer({ children }: ContentRowContainerProps) {
  return (
    <div className="flex flex-row bg-white rounded-lg px-4 py-4 shadow-md">
      <div className="flex-1 grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
} 