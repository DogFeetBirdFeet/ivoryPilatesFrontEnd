import { useLayoutContext } from '@/hooks/useLayoutContext';
import { useEffect, useMemo, useState } from 'react';
import headerIcon from '@/assets/icon/yellow/icon_mem.png';
import InputText from '@/common/components/inputArea/InputText';
import InputNumber from '@/common/components/inputArea/InputNumber';
import InputDate from '@/common/components/inputArea/InputDate';
import Textarea from '@/common/components/inputArea/Textarea';

interface IForm {
  name: string;
  numberFirst: string;
  numberSecond: string;
  numberThird: string;
  birth: Date | null;
  gender: 'W' | 'M';
  height: string;
  weight: string;
  consDate: Date | null;
  surHist: string;
  disease: string;
  memo: string;
  bodyImg: File | null;
}
interface IError {
  name: null | string;
  number: null | string;
  birth: null | string;
  heightWeight: null | string;
  consDate: null | string;
}

export default function MemberRegister() {
  const [formData, setFormData] = useState<IForm>({
    name: '',
    numberFirst: '',
    numberSecond: '',
    numberThird: '',
    birth: new Date(),
    gender: 'W',
    height: '',
    weight: '',
    consDate: new Date(),
    surHist: '',
    disease: '',
    memo: '',
    bodyImg: null,
  });
  const [errorMsg, setErrorMsg] = useState<IError>({
    name: null,
    number: null,
    birth: null,
    heightWeight: null,
    consDate: null,
  });
  const { setHeaderTitle, setHeaderIcon } = useLayoutContext();
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    console.log(formData);
    console.log(errorMsg);
  }, [formData, errorMsg]);

  // 헤더정보 세팅
  useEffect(() => {
    setHeaderTitle('회원 등록');
    setHeaderIcon(headerIcon);
  }, [setHeaderTitle, setHeaderIcon]);

  // Maxlength 체크 이벤트
  const surHistLength = useMemo(() => {
    return new Blob([formData.surHist || '']).size;
  }, [formData.surHist]);

  const diseaseLength = useMemo(() => {
    return new Blob([formData.disease || '']).size;
  }, [formData.disease]);

  const memoLength = useMemo(() => {
    return new Blob([formData.memo || '']).size;
  }, [formData.memo]);

  // 바디체킹 이미지 업로드 이벤트
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((form) => ({ ...form, bodyImg: file }));

      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 저장버튼 클릭 이벤트
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 필수값 검증
    if (!formData.name) {
      setErrorMsg((prev) => {
        return { ...prev, name: '필수 입력 항목입니다.' };
      });
    }
    if (!formData.numberFirst || !formData.numberSecond || !formData.numberThird) {
      setErrorMsg((prev) => {
        return { ...prev, number: '필수 입력 항목입니다.' };
      });
    }
    if (!formData.birth) {
      setErrorMsg((prev) => {
        return { ...prev, birth: '필수 입력 항목입니다.' };
      });
    }
    if (!formData.height || !formData.weight) {
      setErrorMsg((prev) => {
        return { ...prev, heightWeight: '필수 입력 항목입니다.' };
      });
    }
    if (!formData.consDate) {
      setErrorMsg((prev) => {
        return { ...prev, consDate: '필수 입력 항목입니다.' };
      });
    }
    // TODO submit
    console.log('Form submitted:', formData);
  };

  return (
    <form className="m-auto w-[1000px] my-10px" autoComplete="off">
      {/* 기본정보 */}
      <section>
        <div className="h-50px text-[25px] text-gray font-bold border-b-[2px] border-lightGray">기본정보</div>
        <div className="flex flex-col gap-30px p-30px">
          {/* 첫 번째 행 */}
          <div className="flex gap-100px">
            {/* 이름 */}
            <div className="w-1/2 flex items-center">
              <label htmlFor="name" className="flex-shrink-0 w-150px text-xl text-black font-medium">
                이름<span className="text-red">*</span>
              </label>
              <div className="flex-1 relative">
                <InputText
                  id="name"
                  value={formData.name}
                  onChange={(value) => setFormData((form) => ({ ...form, name: value }))}
                  error={!!errorMsg.name}
                />
                <p className="absolute text-red text-base left-[10px] bottom-[-20px]">{errorMsg.name}</p>
              </div>
            </div>

            {/* 연락처 */}
            <div className="w-1/2 flex items-center">
              <label htmlFor="numberFirst" className="flex-shrink-0 w-150px text-xl text-black font-medium">
                연락처<span className="text-red">*</span>
              </label>
              <div className="flex-1 relative">
                <div className="flex items-center gap-5px">
                  <InputNumber
                    id="numberFirst"
                    value={formData.numberFirst}
                    onChange={(value) => setFormData((form) => ({ ...form, numberFirst: value }))}
                    className="w-1/3 text-center"
                    maxLength={3}
                    error={!!errorMsg.number}
                  />
                  <span>-</span>
                  <InputNumber
                    id="numberSecond"
                    value={formData.numberSecond}
                    onChange={(value) => setFormData((form) => ({ ...form, numberSecond: value }))}
                    className="w-1/3 text-center"
                    maxLength={4}
                    error={!!errorMsg.number}
                  />
                  <span>-</span>
                  <InputNumber
                    id="numberThird"
                    value={formData.numberThird}
                    onChange={(value) => setFormData((form) => ({ ...form, numberThird: value }))}
                    className="w-1/3 text-center"
                    maxLength={4}
                    error={!!errorMsg.number}
                  />
                </div>
                <p className="absolute text-red text-base left-[10px] bottom-[-20px]">{errorMsg.number}</p>
              </div>
            </div>
          </div>

          {/* 두 번째 행 */}
          <div className="flex gap-100px">
            {/* 생년월일 */}
            <div className="flex items-center flex-1">
              <label htmlFor="birth" className="flex-shrink-0 w-150px text-xl text-black font-medium">
                생년월일<span className="text-red">*</span>
              </label>
              <div className="relative flex-1">
                <InputDate
                  id="birth"
                  value={formData.birth}
                  onChange={(value) => setFormData((form) => ({ ...form, birth: value }))}
                  error={!!errorMsg.birth}
                />
                <p className="absolute text-red text-base left-[10px] bottom-[-20px]">{errorMsg.birth}</p>
              </div>
            </div>

            {/* 성별 */}
            <div className="flex items-center flex-1">
              <label className="flex-shrink-0 w-150px text-xl text-black font-medium">
                성별<span className="text-red">*</span>
              </label>
              <div className="flex-1 flex items-center gap-20px">
                <label className="flex items-center gap-5px cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="W"
                    checked={formData.gender === 'W'}
                    onChange={(e) =>
                      setFormData((form) => ({
                        ...form,
                        gender: e.target.value as 'W' | 'M',
                      }))
                    }
                  />
                  <span className="text-sm">여자</span>
                </label>
                <label className="flex items-center gap-5px cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={formData.gender === 'M'}
                    onChange={(e) =>
                      setFormData((form) => ({
                        ...form,
                        gender: e.target.value as 'W' | 'M',
                      }))
                    }
                  />
                  <span className="text-sm">남자</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 상세정보 */}
      <section className="mt-10px">
        <div className="h-50px text-[25px] text-gray font-bold border-b-[2px] border-lightGray">상세정보</div>
        <div className="flex flex-col gap-30px p-30px">
          {/* 키/몸무게 */}
          <div className="flex items-center">
            <label htmlFor="height" className="flex-shrink-0 w-150px text-xl text-black font-medium">
              키 / 몸무게<span className="text-red">*</span>
            </label>
            <div className="relative">
              <div className="flex">
                <InputNumber
                  id="height"
                  value={formData.height}
                  onChange={(value) => setFormData((form) => ({ ...form, height: value }))}
                  className="w-110px text-right"
                  maxLength={3}
                  error={!!errorMsg.heightWeight}
                />
                <span className="pl-5px mr-30px">cm</span>
                <InputNumber
                  id="weight"
                  value={formData.weight}
                  onChange={(value) => setFormData((form) => ({ ...form, weight: value }))}
                  className="w-110px text-right"
                  maxLength={3}
                  error={!!errorMsg.heightWeight}
                />
                <span className="pl-5px mr-20px">kg</span>
              </div>
              <p className="absolute text-red text-base left-[10px] bottom-[-20px]">{errorMsg.heightWeight}</p>
            </div>
          </div>

          {/* 상담일자 */}
          <div className="flex items-center flex-1">
            <label htmlFor="consDate" className="flex-shrink-0 w-150px text-xl text-black font-medium">
              상담일자<span className="text-red">*</span>
            </label>
            <div className="relative">
              <InputDate
                id="consDate"
                value={formData.consDate}
                onChange={(value) => setFormData((form) => ({ ...form, consDate: value }))}
                className="w-[300px]"
                error={!!errorMsg.consDate}
              />
              <p className="absolute text-red text-base left-[10px] bottom-[-20px]">{errorMsg.consDate}</p>
            </div>
          </div>

          {/* 수술 및 시술내역 */}
          <div className="flex">
            <label htmlFor="surHist" className="flex-shrink-0 w-150px text-xl text-black font-medium ">
              수술 및 시술내역
              <p className="text-[#444444]">{`(${surHistLength}/4000byte)`}</p>
            </label>
            <Textarea
              id="surHist"
              value={formData.surHist}
              onChange={(value: string) => setFormData((form) => ({ ...form, surHist: value }))}
              className="flex-1 h-120px"
              maxLength={4000}
            />
          </div>

          {/* 지병 */}
          <div className="flex">
            <label htmlFor="disease" className="flex-shrink-0 w-150px text-xl text-black font-medium ">
              지병
              <p className="text-[#444444]">{`(${diseaseLength}/4000byte)`}</p>
            </label>
            <Textarea
              id="disease"
              value={formData.disease}
              onChange={(value: string) => setFormData((form) => ({ ...form, disease: value }))}
              className="flex-1 h-120px"
              maxLength={4000}
            />
          </div>

          {/* 메모 */}
          <div className="flex">
            <label htmlFor="memo" className="flex-shrink-0 w-150px text-xl text-black font-medium">
              메모
              <p className="text-[#444444]">{`(${memoLength}/4000byte)`}</p>
            </label>
            <Textarea
              id="memo"
              value={formData.memo}
              onChange={(value: string) => setFormData((form) => ({ ...form, memo: value }))}
              className="flex-1 h-120px"
              maxLength={4000}
            />
          </div>

          {/* 바디체킹 이미지 */}
          <div className="flex">
            <label className="flex-shrink-0 w-150px text-xl text-black font-medium">바디체킹 이미지</label>
            <div className="flex-1">
              <input type="file" id="bodyImg" accept="image/*" onChange={handleImageUpload} className="hidden" />

              {imagePreview ? (
                <div className="relative inline-block w-120px h-120px group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-default" />
                  {/* Hover 시 나타나는 오버레이와 쓰레기통 */}
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData((form) => ({ ...form, bodyImg: null }));
                      setImagePreview('');
                    }}
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-default opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  >
                    <svg className="w-40px h-40px text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                // 파일이 없을 때
                <label
                  htmlFor="bodyImg"
                  className="inline-flex flex-col items-center justify-center w-120px h-120px bg-lightGray rounded-default cursor-pointer hover:bg-gray transition-colors"
                >
                  <div className="text-white text-[40px]">+</div>
                  <div className="text-white text-base">이미지 추가</div>
                </label>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 저장 버튼 */}
      <div className="mt-30px mb-50px">
        <button
          onClick={handleSubmit}
          className="w-full h-40px bg-ppp text-white text-xl font-medium rounded-default hover:bg-opacity-90 transition-colors"
        >
          저장
        </button>
      </div>
    </form>
  );
}
