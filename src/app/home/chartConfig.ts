export const pieOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1.4,
    scales: {
      x: {display:false},
      y: {display:false}  
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          usePointStyle: true
        }
      }
    }
}

export const lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#2a2a40',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: '#444',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {color: '#cccccc',font: {size: 8}},
        grid: {color: '#333333'},
      },
      y: {
        ticks: {color: '#cccccc'},
        grid: {color: '#333333'},
      }
    }
  };

  export const stackedOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1.3,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#2a2a40',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: '#444',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#cccccc',
        },
        grid: {
          color: '#333333'
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: '#cccccc'
        },
        grid: {
          color: '#333333'
        }
      }
    }
  };

  export const doubleBarOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1.25,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#2a2a40',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: '#444',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          color: '#cccccc',
        },
        grid: {
          color: '#333333'
        }
      },
      y: {
        type: 'logarithmic',
        stacked: false,
        ticks: {
          color: '#cccccc'
        },
        grid: {
          color: '#333333'
        }
      }
    }
  };

  export const retentionLineOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1.1,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#2a2a40',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: '#444',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {color: '#cccccc',font: {size: 8}},
        grid: {color: '#333333'},
      },
      y: {
        ticks: {color: '#cccccc'},
        grid: {color: '#333333'},
      }
    }
  }
  

