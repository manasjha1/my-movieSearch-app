function Trailer({ findTrailer }: any) {
    return (
        <iframe
            className="rounded-sm w-full h-170"
            // width="100%"
            // height="650"
            src={`https://www.youtube.com/embed/${findTrailer?.key}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        />
    );
}
export default Trailer;