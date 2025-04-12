import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Sidebar from './Sidebar';

function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [moonPhaseFilter, setMoonPhaseFilter] = useState('All');
  const [tempRange, setTempRange] = useState([0, 100]);
  const [showTempChart, setShowTempChart] = useState(true); // Stretch: Toggle charts
  const [showMoonRiseChart, setShowMoonRiseChart] = useState(true);

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
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = data
      .filter((item) =>
        item.date.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((item) =>
        moonPhaseFilter === 'All' ? true : item.moonPhase === moonPhaseFilter
      )
      .filter((item) =>
        item.temperature >= tempRange[0] && item.temperature <= tempRange[1]
      );
    setFilteredData(filtered);
  }, [searchQuery, moonPhaseFilter, tempRange, data]);

  // Calculate summary statistics
  const lowestTemp = data.length
    ? Math.min(...data.map((item) => item.temperature))
    : null;
  const earliestMoonRise = data.length
    ? data.reduce((earliest, item) => {
        if (!earliest || item.moonRise < earliest) return item.moonRise;
        return earliest;
      }, null)
    : null;
  const mostCommonMoonPhase = data.length
    ? (() => {
        const phaseCount = {};
        data.forEach((item) => {
          phaseCount[item.moonPhase] = (phaseCount[item.moonPhase] || 0) + 1;
        });
        return Object.keys(phaseCount).reduce((a, b) =>
          phaseCount[a] > phaseCount[b] ? a : b
        );
      })()
    : null;

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle moon phase filter
  const handleMoonPhaseFilter = (e) => {
    setMoonPhaseFilter(e.target.value);
  };

  // Handle temperature range filter
  const handleTempRange = (e, index) => {
    const newRange = [...tempRange];
    newRange[index] = parseInt(e.target.value);
    setTempRange(newRange);
  };

  // Get unique moon phases for the dropdown
  const moonPhases = ['All', ...new Set(data.map((item) => item.moonPhase))];

  // Map moon phases to emojis (as a placeholder for icons)
  const getMoonPhaseEmoji = (phase) => {
    switch (phase?.toLowerCase()) {
      case 'new moon':
        return '🌑';
      case 'waxing crescent':
        return '🌒';
      case 'first quarter':
        return '🌓';
      case 'waxing gibbous':
        return '🌔';
      case 'full moon':
        return '🌕';
      case 'waning gibbous':
        return '🌖';
      case 'last quarter':
        return '🌗';
      case 'waning crescent':
        return '🌘';
      default:
        return '🌙';
    }
  };

  // Convert moon rise time to minutes for charting
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h1>AstroDash</h1>

        {/* Summary Statistics */}
        <div className="summary-stats">
          <div className="stat">
            <h3>Low Temp</h3>
            <p>{lowestTemp !== null ? `${lowestTemp}°F` : 'N/A'}</p>
          </div>
          <div className="stat">
            <h3>Earliest Moon Rise</h3>
            <p>{earliestMoonRise || 'N/A'}</p>
          </div>
          <div className="stat">
            <h3>Most Common Moon Phase</h3>
            <p>{mostCommonMoonPhase || 'N/A'}</p>
          </div>
        </div>

        {/* Stretch: Description */}
        <div className="description">
          <h3>Explore the Night Sky</h3>
          <p>
            This dashboard tracks temperature and lunar activity in New York over a series of days. Use the filters to explore how temperature and moon phases correlate. For example, try filtering by moon phase to see if certain phases coincide with temperature changes, or adjust the temperature range to focus on cooler or warmer days.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="controls">
          <div className="filter">
            <input
              type="text"
              placeholder="Enter Date (YYYY-MM-DD)"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="filter">
            <label>Moon Phase: </label>
            <select value={moonPhaseFilter} onChange={handleMoonPhaseFilter}>
              {moonPhases.map((phase) => (
                <option key={phase} value={phase}>
                  {phase}
                </option>
              ))}
            </select>
          </div>
          <div className="filter">
            <label>
              Temperature Range: {tempRange[0]}°F - {tempRange[1]}°F
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={tempRange[0]}
              onChange={(e) => handleTempRange(e, 0)}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={tempRange[1]}
              onChange={(e) => handleTempRange(e, 1)}
            />
          </div>
        </div>

        {/* Stretch: Toggle Charts */}
        <div className="chart-toggles">
          <label>
            <input
              type="checkbox"
              checked={showTempChart}
              onChange={() => setShowTempChart(!showTempChart)}
            />
            Show Temperature Chart
          </label>
          <label>
            <input
              type="checkbox"
              checked={showMoonRiseChart}
              onChange={() => setShowMoonRiseChart(!showMoonRiseChart)}
            />
            Show Moon Rise Chart
          </label>
        </div>

        {/* Charts */}
        <div className="charts">
          {showTempChart && (
            <div className="chart">
              <h3>Temperature Over Time</h3>
              <LineChart width={500} height={300} data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
              </LineChart>
            </div>
          )}
          {showMoonRiseChart && (
            <div className="chart">
              <h3>Moon Rise Time Over Time</h3>
              <LineChart width={500} height={300} data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={(item) => convertTimeToMinutes(item.moonRise)}
                  name="Moon Rise (Minutes)"
                  stroke="#82ca9d"
                />
              </LineChart>
            </div>
          )}
        </div>

        {/* Data Table */}
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature (°F)</th>
              <th>Moon Rise</th>
              <th>Moon Set</th>
              <th>Moon Phase</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.date}>
                  <td>
                    <Link to={`/detail/${item.date}`}>{item.date}</Link>
                  </td>
                  <td>{item.temperature}</td>
                  <td>{item.moonRise}</td>
                  <td>{item.moonSet}</td>
                  <td>
                    {getMoonPhaseEmoji(item.moonPhase)} {item.moonPhase}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data matches your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
