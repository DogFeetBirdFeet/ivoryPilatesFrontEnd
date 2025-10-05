import pilatesAcct from '@/assets/pilates_acct.png';
import pilatesLogo from '@/assets/pilates_logo.png';
import iconSettings from '@/assets/icon/purple/icon_setting.png';
import iconVac from '@/assets/icon/purple/icon_vac.png';
import BtnIconText from '@/common/components/buttons/BtnIconText';

interface IInsDay {
    centerInfo: boolean;
    acctInfo: string[];
}

interface CenterAndAcctInfoProps {
    mockData: IInsDay[];
}

export default function CenterAndAcctInfo({mockData}: CenterAndAcctInfoProps) {
    return (
        <>
            <div className="flex-1 flex items-center justify-between mb-10px">
                <div className="flex items-center gap-4">
                    <img src={pilatesLogo} className="w-70px h-70px" draggable="false" alt={''}/>
                    <p className="text-xl font-bold">센터 </p>
                    {mockData[0].centerInfo && (
                        <p className="text-xl text-red text-center">휴무일</p>
                    )}
                    {!mockData[0].centerInfo && (
                        <p className="text-xl text-black text-center">휴무일이 아닙니다</p>
                    )}
                </div>
                <BtnIconText
                    type="B"
                    icon={iconSettings}
                    text="휴무 변경하기"
                    onClick={() => {
                        console.log('센터 설정');
                    }}
                />
            </div>
            <div className="flex-1 flex items-center justify-between mb-10px">
                <div className="flex items-center gap-4">
                    <img src={pilatesAcct} className="w-70px h-70px" draggable="false" alt={''}/>
                    <p className="text-xl font-bold">강사 </p>
                    {mockData[0].acctInfo.length > 0 && (
                        <>
                            {mockData[0].acctInfo.map((acct) => (
                                <p key={acct} className="text-xl text-red text-center">{acct} 휴가</p>
                            ))}
                        </>
                    )}
                    {mockData[0].acctInfo.length === 0 && (
                        <p className="text-xl text-black text-center">휴가자가 없습니다</p>
                    )}
                </div>
                <BtnIconText
                    type="B"
                    icon={iconVac}
                    text="휴가 추가하기"
                    onClick={() => {
                        console.log('강사 설정');
                    }}
                />
            </div>
        </>
    );
}
