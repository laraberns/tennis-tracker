import { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack, CircularProgress } from "@mui/material";
import Layout from "../../components/Layout";
import Menu from "../../components/Menu";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {
  containerStyle,
  title,
  videoGridStyle,
  videoCardStyle,
  videoFrameStyle,
  videoElement,
  downloadButtonContainer,
  loadingContainer,
  loadMoreContainer,
} from "./styles";

const PEXELS_API = "https://api.pexels.com/videos/search";
const PEXELS_KEY = "3sQwtlNv6zASIPzkyfGx07yIZqplowBicEHKPRUyHCMCt72hqLHKIhlL";

const DicasConteudos = ({ query = "tennis", maxResults = 6 }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(query);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchVideos = async () => {
      setLoading(true);

      const queryForAPI = search.trim() || "tennis";
      try {
        const res = await fetch(
          `${PEXELS_API}?query=${queryForAPI}&per_page=${maxResults}&page=${page}`,
          {
            headers: {
              Authorization: PEXELS_KEY,
            },
          }
        );

        if (!res.ok) throw new Error(`Erro na API: ${res.status}`);
        const data = await res.json();

        const vids = (data.videos || []).map((v) => ({
          id: v.id,
          videoUrl: v.video_files?.[0]?.link,
        }));

        if (active) {
          setVideos((prev) => (page === 1 ? vids : [...prev, ...vids]));
          setHasMore(data.videos?.length === maxResults);
        }
      } catch (err) {
        console.error("Erro ao buscar vídeos:", err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      active = false;
    };
  }, [search, page, maxResults]);

  const handleLoadMore = () => setPage((prev) => prev + 1);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Menu />
        <Box sx={containerStyle}>
          <Typography variant="h5" sx={title}>
            Vídeos de Dicas e Treinos
          </Typography>

          <Box sx={{ mb: 3, maxWidth: 360 }}>
            <Input
              label="Pesquisar (ex: forehand, saque, treino)"
              value={search}
              onChange={handleSearch}
            />
          </Box>

          {loading && videos.length === 0 ? (
            <Stack alignItems="center" sx={loadingContainer}>
              <CircularProgress />
              <Typography mt={2}>Carregando vídeos...</Typography>
            </Stack>
          ) : (
            <>
              {!loading && videos.length === 0 ? (
                <Stack alignItems="center" mt={4}>
                  <Typography>
                    Nenhum vídeo encontrado para esta pesquisa.
                  </Typography>
                </Stack>
              ) : (
                <>
                  <Grid container spacing={2} sx={videoGridStyle}>
                    {videos.map((v) => (
                      <Grid item xs={12} sm={6} md={4} key={v.id}>
                        <Card sx={videoCardStyle}>
                          <Box sx={videoFrameStyle}>
                            <Box
                              component="video"
                              src={v.videoUrl}
                              controls
                              sx={videoElement}
                            />
                          </Box>

                          <Box sx={downloadButtonContainer}>
                            <Button
                              onClick={() => window.open(v.videoUrl, "_blank")}
                            >
                              Download
                            </Button>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {hasMore && !loading && (
                    <Stack alignItems="center" sx={loadMoreContainer}>
                      <Button onClick={handleLoadMore}>Carregar mais</Button>
                    </Stack>
                  )}

                  {loading && videos.length > 0 && (
                    <Stack alignItems="center" mt={2}>
                      <CircularProgress size={28} />
                    </Stack>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default DicasConteudos;
