import { getDateString } from '../../utils/getDateString';

export const CheckExpired = ({
  timestamp,
  showDate = true,
  cancelReason = '',
}: {
  timestamp: number;
  showDate?: boolean;
  cancelReason?: string;
}) => {
  return (
    <div className="flex flex-col">
      {cancelReason ? (
        <div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <div>Đã hủy</div>
          </div>
        </div>
      ) : (
        <>
          <div>
            {isExpired(timestamp) ? (
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <div>Còn thời hạn</div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-500" />
                <div>Đã hết hạn</div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="text-xs font-light opacity-70">
        {showDate && !cancelReason ? getDateString(timestamp) : ''}
      </div>
    </div>
  );
};

function isExpired(timestamp: number): boolean {
  if (isNaN(timestamp) || timestamp <= 0) {
    return false; // Invalid timestamp
  }

  const currentTimestamp = Math.floor(Date.now()); // Current timestamp in seconds

  return timestamp > currentTimestamp;
}
