function Trailer({ findTrailer }: any) {
    return (
        <iframe
            width="100%"
            height="500"
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