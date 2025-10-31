import { useEffect, useState } from 'react';
import iconView from '@/assets/icon/icon_view.png';

interface IProps {
  image: File | null;
  onImageChange: (newVal: File | null) => void;
  editMode: boolean;
}

export default function BodyCheckImg({ image, onImageChange, editMode }: IProps) {
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  // 바디체킹 이미지 업로드 이벤트
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onImageChange(file);
      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-[260px]">
      <input type="file" id="bodyImg" accept="image/*" onChange={handleImageUpload} className="hidden" />
      {preview ? (
        editMode ? (
          // 파일 있을 때 + 수정시
          <div className="w-full h-full relative group">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-default" />
            <div
              onClick={(e) => {
                e.preventDefault();
                setPreview('');
                onImageChange(null);
                // TODO : 삭제 확인 confirm 팝업
              }}
              className="absolute inset-0 bg-white bg-opacity-50 rounded-default opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <svg className="w-40px h-40px text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        ) : (
          // 파일 있을 때 + 조회시
          <div className="w-full h-full relative group">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-default" />
            <div
              onClick={(e) => {
                e.preventDefault();
                // TODO : 이미지 확대 팝업
              }}
              className="absolute inset-0 bg-white bg-opacity-50 rounded-default opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <img src={iconView} className="w-40px h-40px" />
            </div>
          </div>
        )
      ) : editMode ? (
        // 파일이 없을 때 + 수정시
        <label
          htmlFor="bodyImg"
          className="w-full h-full inline-flex flex-col items-center justify-center bg-lightGray rounded-default cursor-pointer hover:bg-gray transition-colors"
        >
          <div className="text-white text-[40px]">+</div>
          <div className="text-white text-base">이미지 추가</div>
        </label>
      ) : (
        // 파일이 없을 때 + 조회시
        <div className="h-full flex justify-center items-center rounded-default bg-grayWhite">
          <p className="text-sm font-bold text-lightGray">등록된 이미지가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
