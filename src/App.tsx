import {useEffect, useState} from 'react'
import Content from "./components/Content.tsx";
import getVideoId from 'get-video-id';
import copy from 'copy-to-clipboard';

const App = () => {
  const minVideoWidth = 0;
  const minVideoHeight = 0;
  const [videoUrl, setVideoUrl] = useState<string>('https://www.youtube.com/watch?v=XEzRZ35urlk');
  const [videoWidth, setVideoWidth] = useState<string>('560');
  const [videoHeight, setVideoHeight] = useState<string>('315');
  const [embedString, setEmbedString] = useState<string>('');
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
    generateEmbedCode();
  }, [videoUrl, videoWidth, videoHeight]);

  const generateEmbedCode = (): string => {
    const video = getVideoId(videoUrl);

    if (video.service !== 'youtube') {
      setError('Incorrect URL');
      return '';
    }
    const embedUrl = `https://www.youtube.com/embed/${video.id}`;
    const embedCode = `<iframe width="${videoWidth === '' ? 560 : videoWidth}" height="${videoHeight === '' ? 315 : videoHeight}" src="${embedUrl}" title="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen><a href="https://www.ivatech.dev" style="display:none;">website development</a></iframe>`;
    setEmbedString(embedCode);
    setEmbedUrl(embedUrl);

    return embedCode;
  }

  return (
    <>
      <div className={'bg-white p-4 sm:px-10'}>
        <div className={'max-w-[1080px] mx-auto'}>
          <h1 className={'text-2xl font-bold sm:text-3xl'}>YouTube embed code
            generator</h1>
          <small>Easily embed a YouTube widget to your site!</small>
        </div>
      </div>
      <div className={'max-w-[1080px] mx-auto my-4 p-4 bg-white sm:p-10'}>
        <div className={'flex flex-col mb-4 justify-between gap-4 md:flex-row'}>
          <div className={'flex flex-col w-full gap-2 md:w-1/2'}>
            <label>
              Youtube video link<br/>
              <input
                type="url"
                name="video-url"
                placeholder={'https://www.youtube.com/watch?v=XEzRZ35urlk'}
                onChange={e => setVideoUrl(e.target.value)}
                pattern={'^(http|https):\\/\\/(www\\.|m\\.|)(youtube\\.com|youtu\\.be).*$'}
                title={'URL must contain YouTube domain.'}
              />
            </label>
            <label>
              YouTube video width<br/>
              <input
                type="number"
                name="video-width"
                defaultValue={'560'}
                min={minVideoWidth}
                //@ts-ignore
                pattern="[0-9]*" inputmode="numeric"
                onChange={e => setVideoWidth(e.target.value)}/>
            </label>
            <label>
              YouTube video height<br/>
              <input
                type="number"
                name="video-height"
                defaultValue={'315'}
                min={minVideoHeight}
                pattern="[0-9]*"
                //@ts-ignore
                inputmode="numeric"
                onChange={e => setVideoHeight(e.target.value)}/>
            </label>

            <div
              className={'p-4 bg-gray-100 text-gray-400 overflow-hidden break-words'}>
              {`<iframe width="${videoWidth === '' ? 560 : videoWidth}"
                      height="${videoHeight === '' ? 315 : videoHeight}"
                      src="${embedUrl}" title=""
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen></iframe>`}
            </div>
            <button
              className={'px-4 py-2 rounded text-white bg-sky-600 transition-[background] hover:bg-sky-700 active:bg-green-600'}
              onClick={() => copy(embedString)}>Copy
              embed code
            </button>
            {error && <div className={'text-red-500'}>{error}</div>}
          </div>
          <iframe
            className={'w-full md:w-1/2'}
            width="560"
            height="315"
            src={embedUrl}
            title=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <Content/>
      </div>
      <small className={'block mb-4 text-center'}>&copy; 2020-{new Date().getFullYear()}. Ivatech.dev. YouTube Embed Code Generator.</small>
    </>
  )
}

export default App
