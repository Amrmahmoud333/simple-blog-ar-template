module.exports = (readingTime, html) => {
  return (
    `<div id="reading-time"><span>وقت القراءة:</span> ${formatTime(
      readingTime
    )}</div>` + html
  );
};

const formatTime = (readingTime) => {
  if (readingTime === 1) return 'دقيقة';
  if (readingTime === 2) return 'دقيقتين';

  return `${readingTime} ${readingTime > 9 ? 'دقيقة' : 'دقائق'}`;
};
