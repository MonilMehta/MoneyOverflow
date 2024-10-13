import React from 'react';

// JSON Data
const shortsData = [
  { id: 1, title: 'Short 1', url: 'https://www.youtube.com/shorts/kpdNZmtMRB4' },
  { id: 2, title: 'Short 2', url: 'https://www.youtube.com/shorts/gqJLd94QjHQ' },
  { id: 3, title: 'Short 3', url: 'https://www.youtube.com/shorts/6Fjs9ZU1f1w' },
  { id: 4, title: 'Short 4', url: 'https://www.youtube.com/shorts/Oj-UpJ2STC0' },
  { id: 5, title: 'Short 5', url: 'https://www.youtube.com/shorts/A1MkGsIY-NQ' },
  { id: 6, title: 'Short 6', url: 'https://www.youtube.com/shorts/0GxSnWSp3VM' },
  { id: 7, title: 'Short 7', url: 'https://www.youtube.com/shorts/ekCqTvvMl3s' },
  { id: 8, title: 'Short 8', url: 'https://www.youtube.com/shorts/UIBaghaRxaA' },
  { id: 9, title: 'Short 9', url: 'https://www.youtube.com/shorts/yPlPACCTXv0' },
  { id: 10, title: 'Short 10', url: 'https://www.youtube.com/shorts/R4psUPXzLSs' },
  { id: 11, title: 'Short 11', url: 'https://www.youtube.com/shorts/0OB0yGijXE4' },
  { id: 12, title: 'Short 12', url: 'https://www.youtube.com/shorts/n5pyBTNzxp4' },
  { id: 13, title: 'Short 13', url: 'https://www.youtube.com/shorts/V9jWzbsQCuk' },
  { id: 14, title: 'Short 14', url: 'https://www.youtube.com/shorts/NqWJXk700FA' },
  { id: 15, title: 'Short 15', url: 'https://www.youtube.com/shorts/tgeNZq-E-BE' },
  { id: 16, title: 'Short 16', url: 'https://www.youtube.com/shorts/67GaoYVtCOI' }
];

const YouTubeShortsCarousel = () => {
  return (
    <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Quick Fins</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {shortsData.map((short) => (
          <div key={short.id} className="flex-none w-64">
            <iframe
              width="100%"
              height="515"
              src={short.url.replace('/shorts/', '/embed/')}
              title={short.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg mb-2"
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YouTubeShortsCarousel;
