export default function populateColor(status: string) {
  let color;
  
  switch (status) {
    case 'PENDING': {
      color = '#d8a430';
      break;
    }
    case 'COMPLETED': {
      color = '#4ccc45';
      break;
    }
    case 'CANCELLED': {
      color = '#cfcfcf';
      break;
    }
  }
  
  return color;
}
