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
  descriptionText,
} from "./styles";

const YT_API_KEY = "YOUR_YOUTUBE_API_KEY";
const YT_SEARCH_ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

const FALLBACK_VIDEOS = [
  {
    id: "dQw4w9WgXcQ",
    title: "Tennis Tips — Example 1",
    description: "Exemplo de vídeo 1 sobre técnica.",
  },
  {
    id: "kXYiU_JCYtU",
    title: "Tennis Drills — Example 2",
    description: "Exemplo de vídeo 2 com exercícios práticos.",
  },
  {
    id: "3JZ_D3ELwOQ",
    title: "Serve Practice — Example 3",
    description: "Exemplo de treino de saque.",
  },
];

const DicasConteudos = ({ query = "tennis", maxResults = 6 }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchYoutube = async () => {
      if (!YT_API_KEY || YT_API_KEY === "YOUR_YOUTUBE_API_KEY") {
        if (mounted) {
          setVideos(FALLBACK_VIDEOS);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const url = new URL(YT_SEARCH_ENDPOINT);
        url.searchParams.set("part", "snippet");
        url.searchParams.set("type", "video");
        url.searchParams.set("q", query);
        url.searchParams.set("maxResults", String(maxResults));
        url.searchParams.set("key", YT_API_KEY);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
        const data = await res.json();

        const vids = (data.items || []).map((it) => ({
          id: it.id.videoId,
          title: it.snippet.title,
          description: it.snippet.description,
        }));

        if (mounted) setVideos(vids);
      } catch (err) {
        console.error(err);
        if (mounted) setVideos(FALLBACK_VIDEOS);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchYoutube();
    return () => {
      mounted = false;
    };
  }, [query, maxResults]);

return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <Menu />
        <Box sx={containerStyle}>
          <Typography variant="h5" sx={title}>Vídeos de Dicas</Typography>

          <Box sx={{ mb: 3, maxWidth: 360 }}>
            <Input label="Pesquisar (ex: forehand)" value={query} onChange={() => {}} />
          </Box>

          {loading ? (
            <Stack alignItems="center" mt={4}>
              <CircularProgress />
              <Typography mt={2}>Carregando vídeos...</Typography>
            </Stack>
          ) : (
            <Grid container spacing={2} sx={videoGridStyle}>
              {videos.map((v) => (
                <Grid item xs={12} sm={6} md={4} key={v.id}>
                  <Card sx={videoCardStyle}>
                    <Box sx={videoFrameStyle}>
                      <Box
                        component="iframe"
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                      />
                    </Box>

                    <Typography variant="h6" sx={{ mb: 0.5, fontWeight: "bold" }}>
                      {v.title}
                    </Typography>

                    <Typography variant="body2" sx={descriptionText}>
                      {v.description ? (v.description.length > 100 ? v.description.slice(0, 100) + "…" : v.description) : "—"}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      <Button onClick={() => window.open(`https://youtu.be/${v.id}`, "_blank")}>
                        Assistir no YouTube
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default DicasConteudos;
