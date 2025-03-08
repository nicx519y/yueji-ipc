interface BannerProps {
  imageUrl: string;
  title: string;
}

export default function Banner({ imageUrl, title }: BannerProps) {
  return (
    <div className="px-2 py-2 bg-white rounded-lg shadow-md">
      <div 
        className="relative h-[300px] rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-lg" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold text-center">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
} 