import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

function DetailView() {
  const { date } = useParams();
  const [item, setItem] = useState(null);

  // Mock data (replace with API fetch once resolved)
  useEffect(() => {
    const mockData = [
      { date: '2025-04-06', temperature: 38.7, moonRise: '13:33', moonSet: '01:33', moonPhase: 'Waxing Gibbous', humidity: 65, windSpeed: 10 },
      { date: '2025-04-07', temperature: 35.1, moonRise: '14:21', moonSet: '02:02', moonPhase: 'Waxing Gibbous', humidity: 70, windSpeed: 12 },
      { date: '2025-04-08', temperature: 28.3, moonRise: '15:26', moonSet: '02:37', moonPhase: 'Waxing Gibbous', humidity: 60, windSpeed: 8 },
      { date: '2025-04-09', temperature: 25.1, moonRise: '16:28', moonSet: '03:07', moonPhase: 'Waxing Gibbous', humidity: 55, windSpeed: 15 },
      { date: '2025-04-10', temperature: 36.9, moonRise: '17:30', moonSet: '03:13', moonPhase: 'Waxing Gibbous', humidity: 68, windSpeed: 9 },
      { date: '2025-04-11', temperature: 45.5, moonRise: '18:29', moonSet: '03:59', moonPhase: 'Waxing Gibbous', humidity: 72, windSpeed: 11 },
    ];
    const foundItem = mockData.find((d) => d.date === date);
    setItem(foundItem);
  }, [date]);

  if (!item) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <h1>Detail View</h1>
          <p>Data not found for {date}.</p>
          <Link to="/">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>Detail View for {item.date}</h1>
        <div className="detail-content">
          <p><strong>Temperature:</strong> {item.temperature}°F</p>
          <p><strong>Moon Rise:</strong> {item.moonRise}</p>
          <p><strong>Moon Set:</strong> {item.moonSet}</p>
          <p><strong>Moon Phase:</strong> {item.moonPhase}</p>
          {/* Additional info not in dashboard */}
          <p><strong>Humidity:</strong> {item.humidity}%</p>
          <p><strong>Wind Speed:</strong> {item.windSpeed} mph</p>
        </div>
        <Link to="/">Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default DetailView;
