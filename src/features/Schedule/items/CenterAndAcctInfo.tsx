import {useNavigate} from 'react-router-dom';
import useOverlay from '@/hooks/useOverlay';
import pilatesAcct from '@/assets/pilates_acct.png';
import pilatesLogo from '@/assets/pilates_logo.png';
import iconVac from '@/assets/icon/purple/icon_vac.png';
import iconSettings from '@/assets/icon/purple/icon_setting.png';
import BtnIconText from '@/common/components/buttons/BtnIconText';
import type {IInsDay} from '@/features/Schedule/type/types';
import PopupConfirm from '@/common/popup/PopupConfirm';

interface CenterAndAcctInfoProps {
    data?: IInsDay[];
}

export default function CenterAndAcctInfo({data}: CenterAndAcctInfoProps) {

    const overlay = useOverlay();
    const navigate = useNavigate();

    function handleCenterOffConfirm() {

        let isSchExists = false;
        data?.map((item) => {
            if (item.schedId) {
                isSchExists = true;
            }
        });
        if (isSchExists) {
            overlay.showPopup(<PopupConfirm
                onClickConfirm={() => handleConfirm('휴무일')}
                onClickBack={() => ({})}
                isAlert={true}
                confirmText="확인">
                <div>
                    <p>수업 예약이 있는 날짜는 휴가/휴무 설정을 할 수 없습니다.</p>
                </div>
            </PopupConfirm>)
        } else {
            overlay.showPopup(<PopupConfirm
                onClickConfirm={() => handleConfirm('휴무일')}
                onClickBack={handleBack}
                confirmText="확인"
                cancelText="취소">
                <div>
                    <p>{data?.[0].year}년 {data?.[0].month}월 {data?.[0].day}일은 센터 영업일입니다.</p>
                    <p>휴무일로 변경하시겠습니까?</p>
                </div>
            </PopupConfirm>)
        }
    }

    function handleCenterOnConfirm() {
        overlay.showPopup(<PopupConfirm titleText="센터 휴무/영업 설정"
                                        onClickConfirm={() => handleConfirm('영업일')}
                                        onClickBack={handleBack} confirmText="확인"
                                        cancelText="취소">
            <div>
                <p>{data?.[0].year}년 {data?.[0].month}월 {data?.[0].day}일은 센터 후무일입니다.</p>
                <p>영업일일로 변경하시겠습니까?</p>
            </div>
        </PopupConfirm>)
    }

    function handleChangeCenterOffConfirm() {
        const holyYn = data?.[0]?.holYn;

        if (undefined === holyYn || holyYn === 'N')
        {
            overlay.showPopup(<PopupConfirm titleText="센터 휴무/영업 설정"
                                            onClickConfirm={handleCenterOnConfirm}
                                            onClickBack={handleBack} confirmText="확인"
                                            cancelText="취소">
                <div>
                    <p>{data?.[0].year}년 {data?.[0].month}월 {data?.[0].day}일은 센터 영업일입니다.</p>
                    <p>휴무일로 변경하시겠습니까?</p>
                </div>
            </PopupConfirm>)
        }

        if (holyYn === 'Y')
        {
            overlay.showPopup(<PopupConfirm titleText="센터 휴무/영업 설정"
                                            onClickConfirm={handleCenterOffConfirm}
                                            onClickBack={handleBack} confirmText="확인"
                                            cancelText="취소">
                <div>
                    <p>{data?.[0].year}년 {data?.[0].month}월 {data?.[0].day}일은 공휴일입니다.</p>
                    <p>센터 영업일로 변경하시겠습니까?</p>
                </div>
            </PopupConfirm>)
        }
    }

    function handleConfirm(text: string) {
        console.log(`센터 ${text}로 변경`);
        overlay.closePopup();
        navigate(-1);
    }

    function handleBack() {
        overlay.closePopup();
    }

    return (
        <>
            <div className="flex-1 flex items-center justify-between mb-10px">
                <div className="flex items-center gap-4">
                    <img src={pilatesLogo} className="w-35px h-35px m-10px" draggable="false" alt={'필라테스 로고'}/>
                    <p className="text-xl font-bold">센터 </p>
                    {data?.[0]?.centerOffYn === 'Y' && (
                        <>
                            {data?.[0]?.holYn === 'Y' && (
                                <p className="text-xl text-red text-center">공휴일</p>
                            )}
                            {data?.[0]?.holYn === 'N' && (
                                <p className="text-xl text-red text-center">센터 휴무일</p>
                            )}
                        </>

                    )}
                    {data?.[0]?.centerOffYn === 'N' && (
                        <>
                            {data?.[0]?.holYn === 'Y' && (
                                <p className="text-xl text-red text-center">공휴일</p>
                            )}
                            {data?.[0]?.holYn === 'N' && (
                                <p className="text-xl text-black text-center">휴무일이 아닙니다</p>
                            )}
                        </>
                    )}
                    {data?.[0] === undefined && (
                        <p className="text-xl text-gray text-center">휴무일이 아닙니다</p>
                    )}
                </div>
                <div className="m-10px">  
                    <BtnIconText
                        type="B"
                        icon={iconSettings}
                        text="휴무 변경하기"
                        onClick={() => {
                            handleChangeCenterOffConfirm();
                        }

                        }/>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-between mb-10px">
                <div className="flex items-center gap-4">
                    <img src={pilatesAcct} className="w-35px h-35px m-10px" draggable="false" alt={''}/>
                    <p className="text-xl font-bold">강사 </p>
                    {data?.[0]?.acctOffYn === 'Y' && (
                        <>
                            {data?.[0].offAcctNm.split(',').map((acct) => (
                                <p key={acct} className="text-xl text-red text-center">{acct} 휴가</p>
                            ))}
                        </>
                    )}
                    {data?.[0]?.acctOffYn === 'N' && (
                        <p className="text-xl text-gray text-center">휴가자가 없습니다</p>
                    )}
                    {data?.[0]?.acctOffYn === undefined && (
                        <p className="text-xl text-gray text-center">휴가자가 없습니다</p>
                    )}
                </div>
                <div className="m-10px">  
                    <BtnIconText
                        type="B"
                        icon={iconVac}
                        text="휴가 추가하기"
                        onClick={() => {
                            console.log('강사 설정');
                        }}
                    />
                </div>
            </div>
        </>
    )
        ;
}
