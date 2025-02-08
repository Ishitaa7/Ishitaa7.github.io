// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "You can also download my cv from the top pdf download button",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-",
          title: "",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/_pages/dropdown/";
          },
        },{id: "news-joined-bhaskaracharya-national-institute-for-space-applications-and-geo-informatics-bisag-n",
          title: 'Joined Bhaskaracharya National Institute for Space Applications and Geo-informatics (BISAG-N).',
          description: "",
          section: "News",},{id: "news-commenced-work-with-prof-aneesh-chivukula-on-computational-sanskrit",
          title: 'Commenced work with Prof. Aneesh Chivukula on Computational Sanskrit',
          description: "",
          section: "News",},{id: "news-started-working-with-prof-prajna-devi-upadhyay-on-machine-translation-for-low-resource-languages-a-project-under-the-ministry-of-tribal-affairs",
          title: 'Started working with Prof. Prajna Devi Upadhyay on Machine Translation for Low-Resource Languages,...',
          description: "",
          section: "News",},{id: "projects-visualization-of-large-scale-weather-data-for-regional-pattern-analysis",
          title: 'Visualization of Large-Scale Weather Data for Regional Pattern Analysis',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/BISAG/";
            },},{id: "projects-character-recognition-in-images-with-opencv-and-tesseract-ocr",
          title: 'Character Recognition in Images with OpenCV and Tesseract OCR',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/CharRecogImages/";
            },},{id: "projects-fpga-implementation-of-hand-written-text",
          title: 'FPGA Implementation of Hand Written Text',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/OCR_FPGA/";
            },},{id: "projects-leveraging-feature-driven-contextual-similarity-metrics-for-semantic-relation-quantification",
          title: 'Leveraging Feature-Driven Contextual Similarity Metrics for Semantic Relation Quantification',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/SemanticRelatedness/";
            },},{id: "projects-dynamic-neural-architectures-advancing-hinton-39-s-forward-forward-algorithm",
          title: 'Dynamic Neural Architectures: Advancing Hinton&amp;#39;s Forward-Forward Algorithm',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/FwdFwdHinton/";
            },},{id: "projects-automated-nlp-pipeline-for-web-content-extraction-and-analysis",
          title: 'Automated NLP Pipeline for Web Content Extraction and Analysis',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Black/";
            },},{id: "projects-time-series-analysis-for-prediction-of-daily-maximum-temperature",
          title: 'Time Series Analysis for Prediction of Daily Maximum Temperature',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/FodsProject/";
            },},{id: "projects-custom-built-semantic-framework-developing-open-information-extraction-and-word2vec-models-from-first-principles",
          title: 'Custom-Built Semantic Framework: Developing Open Information Extraction and Word2Vec Models from First Principles...',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/OIEandWord2Vec/";
            },},{id: "projects-principal-component-decomposition-of-electrophysiological-signals-advanced-spike-sorting-with-mountainsort5",
          title: 'Principal Component Decomposition of Electrophysiological Signals: Advanced Spike Sorting with MountainSort5',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ElectrophysiologicalData/";
            },},{id: "projects-sentimental-analysis-using-imdb-review",
          title: 'Sentimental Analysis using IMDB Review',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/IMDbSentAnal/";
            },},{id: "projects-machine-translation-of-low-resource-languages",
          title: 'Machine Translation of Low Resource Languages',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/MTofMundari/";
            },},{id: "projects-computational-sanskrit",
          title: 'Computational Sanskrit',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ComputationalSanskrit/";
            },},{
        id: 'social-discord',
        title: 'Discord',
        section: 'Socials',
        handler: () => {
          window.open("https://discord.com/users/923515452729204746", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%69%73%68%69%74%61%72%61%6A%35%31%37%33@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Ishitaa7", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
