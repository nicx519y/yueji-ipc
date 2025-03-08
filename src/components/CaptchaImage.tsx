import { useState } from 'react';
import Image from 'next/image';

interface CaptchaImageProps {
  onRefresh?: () => void;
}

export default function CaptchaImage({ onRefresh }: CaptchaImageProps) {
  const [timestamp, setTimestamp] = useState(Date.now());

  const handleRefresh = () => {
    setTimestamp(Date.now());
    onRefresh?.();
  };

  return (
    <div 
      className="w-32 h-10 bg-gray-100 rounded cursor-pointer overflow-hidden"
      onClick={handleRefresh}
      title="点击刷新验证码"
    >
      <Image
        src={`/api/captcha?t=${timestamp}`}  // 添加时间戳防止缓存
        alt="验证码"
        width={128}
        height={40}
        className="rounded"
      />
    </div>
  );
} 