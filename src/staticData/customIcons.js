import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

export const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon sx={{fontSize:50}} />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon sx={{fontSize:50}} />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon sx={{fontSize:50}} />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon sx={{fontSize:50}} />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon sx={{fontSize:50}} />,
      label: 'Very Satisfied',
    },
};