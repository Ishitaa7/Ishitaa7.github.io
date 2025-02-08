---
layout: page
date: 2024-07-25 16:40:16
title: Time Series Analysis for Prediction of Daily Maximum Temperature
# description: a project that redirects to another website
img: assets/img/7.png
# redirect: https://unsplash.com
importance: 3
category: completed
toc:
  sidebar: left
tabs: True
---

## Overview

This project explores time-series forecasting of daily maximum temperatures using statistical modeling techniques. The objective is to build a predictive model that can accurately estimate future temperature values and compare its performance against publicly available weather app predictions.

## Data Collection & Cleaning

The dataset includes daily recorded maximum temperatures (actual temperature) from May 30 to July 12, along with the predicted maximum temperatures for the next three days, stored in a CSV file which can be accessed [here](https://drive.google.com/file/d/1YsKZlXe1oL5J-todxhVZ1oJtCzckPtL9/view?usp=sharing). Since there were no missing values, the dataset required minimal preprocessing.
Exploratory Data Analysis (EDA) was conducted to:

- Calculate mean, median, and mode of recorded temperatures.
- Generate histograms to visualize temperature distribution.

Here is the code snippet used for calculating the mean, median and mode of the actual temperature, and for generating a histogram from the data:

```python
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats


file_path = 'Copy of FoDS Weather Data.xlsx'
df = pd.read_excel(file_path)


actual_temperatures = df['Actual_Temperature']

# Calculate mean, median, and mode
mean_temp = actual_temperatures.mean()
median_temp = actual_temperatures.median()
mode_temp = stats.mode(actual_temperatures, keepdims=True).mode[0]

print("Mean temperature = ", mean_temp)
print("Median temperature = ", median_temp)
print("Mode of tempertaures = ", mode_temp)


# Create a histogram of the actual temperatures
plt.figure(figsize=(10, 6))
plt.hist(actual_temperatures, bins=20, edgecolor='black', alpha=0.7)
plt.title('Histogram of Actual Temperatures')
plt.xlabel('Temperature')
plt.ylabel('Frequency')
plt.grid(True)
plt.show()
```

{% include figure.liquid loading="eager" path="assets/img/HistogramOfActualTemp.jpg" title="example image" class="img-fluid rounded z-depth-1" %}

>Mean Temperature = 31.61363 <br>
>Median Temperature = 31.5 <br>
>Mode of Temperatures = 32
{: .block-highlight }

### Key Statistical Insights:

- Temperature distribution follows a normal pattern, with slight skewness.
- Mean and median temperatures closely align, confirming low variance.


## Predictive Modelling and Error Analysis
The ARIMA model was chosen for temperature forecasting due to its effectiveness in handling seasonal and non-stationary time-series data. <br>
**Training Approach:**

- Two ARIMA models were trained using different amounts of historical data:
  - First **3** data points for short-term prediction.
  - First **27** data points for a more robust forecast.
- Hyperparameters (p, d, q) were selected using empirical tuning.
- The model was used to predict temperatures for the next three days.


### Using First 3 Data Points

{% tabs 3pt %}

{% tab 3pt Training ARIMA Model %}

```python
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

# Load the data from the Excel file
file_path = 'Copy of FoDS Weather Data.xlsx'
df = pd.read_excel(file_path)

# Extract the actual temperatures and dates
actual_temperatures = df['Actual_Temperature']
dates = df['Date']

# Train the ARIMA model using the first 3 data points
train_data = actual_temperatures[:3]
model = ARIMA(train_data, order=(1, 1, 1))
model_fit = model.fit()

# Predict the temperatures for the next 3 days
predictions = model_fit.forecast(steps=3)

# Determine the starting date for the predictions
start_date = dates.iloc[2]  # The last date in the training set
prediction_dates = pd.date_range(start=start_date, periods=4)[1:]  # Exclude the start date itself

# Format the dates to display the month names
formatted_dates = prediction_dates.strftime('%B %d, %Y')

# Reset the index of predictions to use formatted dates
predictions.index = formatted_dates
print(predictions)
```
#### Prediction
>Highest Temp on Jun 02, 2024: 38.999514  <br>
>Highest Temp on Jun 03, 2024: 38.00064 <br>
>Highest Temp on Jun 04, 2024: 38.998867
{: .block-highlight }

{% endtab %}

{% tab 3pt ARIMA Model Prediction Error %}
```python
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error

# Load the data from the Excel file
file_path = 'Copy of FoDS Weather Data.xlsx'
df = pd.read_excel(file_path)

# Extract the actual temperatures and dates
actual_temperatures = df['Actual_Temperature']
dates = df['Date']

# Train the ARIMA model using the first 3 data points
train_data = actual_temperatures[:3]
model = ARIMA(train_data, order=(1, 1, 1))
model_fit = model.fit()

# Predict the temperatures for the next 3 days
predictions = model_fit.forecast(steps=3)

# Determine the starting date for the predictions
start_date = dates.iloc[2]  # The last date in the training set
prediction_dates = pd.date_range(start=start_date, periods=4)[1:]  # Exclude the start date itself

# Format the dates to display the month names
formatted_dates = prediction_dates.strftime('%B %d, %Y')

# Reset the index of predictions to use formatted dates
predictions.index = formatted_dates

# Extract the actual temperatures for comparison
actual_future_temperatures = actual_temperatures[3:6].reset_index(drop=True)

# Calculate the prediction error for each day
prediction_errors = predictions.values - actual_future_temperatures.values

# Calculate the mean absolute error (MAE)
mae = mean_absolute_error(actual_future_temperatures, predictions.values)

# Create a DataFrame to display the results
results_df = pd.DataFrame({
    'Date': formatted_dates,
    'Predicted_Temperature': predictions.values,
    'Actual_Temperature': actual_future_temperatures.values,
    'Prediction_Error': prediction_errors
})

print(results_df)
print(f"Mean Absolute Error (MAE): {mae}")
```
>| Date         | Predicted Temperature | Actual Temperature | Prediction Error |
|-------------|----------------------|--------------------|------------------|
| June 02, 2024 | 38.999514            | 38                 | 0.999514         |
| June 03, 2024 | 38.000647            | 32                 | 6.000647         |
| June 04, 2024 | 38.998867            | 34                 | 4.998867         |

**Mean Absolute Error (MAE):** 3.999676296043288
{: .block-highlight }

{% endtab %}

{% endtabs %}








### Using 27 Data Points

{% tabs 27pt %}

{% tab 27pt Training ARIMA Model %}

```python
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

# Load the data from the Excel file
file_path = 'Copy of FoDS Weather Data.xlsx'
df = pd.read_excel(file_path)

# Extract the actual temperatures and dates
actual_temperatures = df['Actual_Temperature']
dates = df['Date']

# Train the ARIMA model using the first 27 data points
train_data_27 = actual_temperatures[:27]
model_27 = ARIMA(train_data_27, order=(1, 1, 1))
model_fit_27 = model_27.fit()

# Predict the temperatures for the next 3 days
predictions_27 = model_fit_27.forecast(steps=3)

# Determine the starting date for the predictions
start_date = dates.iloc[26]  # The last date in the training set
prediction_dates = pd.date_range(start=start_date, periods=4)[1:]  # Exclude the start date itself

# Format the dates to display the month names
formatted_dates = prediction_dates.strftime('%B %d, %Y')

# Reset the index of predictions to use formatted dates
predictions_27.index = formatted_dates
print(predictions_27)
```

> #### Prediction
>Highest Temp on Jun 26, 2024: 32.391275  <br>
>Highest Temp on Jun 27, 2024: 38.200240 <br>
>Highest Temp on Jun 28, 2024: 38.293510
{: .block-highlight }


{% endtab %}

{% tab 27pt ARIMA Model Prediction Error %}

```python
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error

file_path = 'Copy of FoDS Weather Data.xlsx'
df = pd.read_excel(file_path)
actual_temperatures = df['Actual_Temperature']
dates = df['Date']

# Train the ARIMA model using the first 27 data points
train_data_27 = actual_temperatures[:27]
model_27 = ARIMA(train_data_27, order=(1, 1, 1))
model_fit_27 = model_27.fit()

# Predict the temperatures for the next 3 days
predictions_27 = model_fit_27.forecast(steps=3)

# Determine the starting date for the predictions
start_date_27 = dates.iloc[26]  # The last date in the training set
prediction_dates_27 = pd.date_range(start=start_date_27, periods=4)[1:]  # Exclude the start date itself

# Format the dates to display the month names
formatted_dates_27 = prediction_dates_27.strftime('%B %d, %Y')

# Reset the index of predictions to use formatted dates
predictions_27.index = formatted_dates_27

# Extract the actual temperatures for comparison
actual_future_temperatures_27 = actual_temperatures[27:30].reset_index(drop=True)

# Calculate the prediction error for each day
prediction_errors_27 = predictions_27.values - actual_future_temperatures_27.values

# Calculate the mean absolute error (MAE)
mae_27 = mean_absolute_error(actual_future_temperatures_27, predictions_27.values)

# Create a DataFrame to display the results
results_df_27 = pd.DataFrame({
    'Date': formatted_dates_27,
    'Predicted_Temperature': predictions_27.values,
    'Actual_Temperature': actual_future_temperatures_27.values,
    'Prediction_Error': prediction_errors_27
})

print(results_df_27)
print(f"Mean Absolute Error (MAE) for 27 data points: {mae_27}")
```
>| Date         | Predicted Temperature | Actual Temperature | Prediction Error |
|-------------|----------------------|--------------------|------------------|
| June 26, 2024 | 32.391275            | 32                 | 0.391275         |
| June 27, 2024 | 32.200240            | 29                 | 3.200240         |
| June 28, 2024 | 32.293510            | 30                 | 2.293510         |

**Mean Absolute Error (MAE) for 27 data points:** 1.9616748230079157
{: .block-highlight }

{% endtab %}

{% endtabs %}


### Results
- More training data led to improved prediction accuracy, reducing overfitting.
- ARIMA captured temperature trends effectively, but accuracy declined over longer horizons

## Error in Weather App Predictions
The ARIMA model was compared against **real-world weather app predictions**.

{% tabs app %}

{% tab app Weather App Prediction Error When First 3 Data Points Are Taken %}

```python
import pandas as pd
import numpy as np
from sklearn.metrics import mean_absolute_error

# Load the data from the Excel file
file_path = 'Copy of FoDS Weather Data.xlsx'
df = pd.read_excel(file_path)

# Extract the actual temperatures and dates
actual_temperatures = df['Actual_Temperature']
dates = df['Date']
predicted_temp_day1 = df['Predicted_Temperature_Day1']
predicted_temp_day2 = df['Predicted_Temperature_Day2']
predicted_temp_day3 = df['Predicted_Temperature_Day3']

# Find the index for June 1
june_1_index = dates[dates == '2024-06-01'].index[0]

# Actual temperatures for June 2, June 3, June 4
actual_temp_june_2_to_4 = actual_temperatures[june_1_index+1:june_1_index+4]

# Predicted temperatures for June 2, June 3, June 4 from June 1
predicted_temp_june_2_to_4 = pd.Series([
    predicted_temp_day1[june_1_index],
    predicted_temp_day2[june_1_index],
    predicted_temp_day3[june_1_index]
])

# Calculate the mean absolute error (MAE)
mae_june_2 = mean_absolute_error([actual_temp_june_2_to_4.iloc[0]], [predicted_temp_june_2_to_4.iloc[0]])
mae_june_3 = mean_absolute_error([actual_temp_june_2_to_4.iloc[1]], [predicted_temp_june_2_to_4.iloc[1]])
mae_june_4 = mean_absolute_error([actual_temp_june_2_to_4.iloc[2]], [predicted_temp_june_2_to_4.iloc[2]])

# Calculate the total mean absolute error (MAE)
total_mae = mean_absolute_error(actual_temp_june_2_to_4, predicted_temp_june_2_to_4)

# Display the results
results = {
    'Date': ['June 2', 'June 3', 'June 4'],
    'Actual Temperature': actual_temp_june_2_to_4.values,
    'Predicted Temperature': predicted_temp_june_2_to_4.values,
    'MAE': [mae_june_2, mae_june_3, mae_june_4]
}

results_df = pd.DataFrame(results)
results_df.loc['Total MAE'] = ['', '', '', total_mae]

print(results_df)
```
>| Date      | Actual Temperature | Predicted Temperature | MAE  |
|-----------|--------------------|----------------------|------|
| June 2    | 38                 | 38                   | 0.0  |
| June 3    | 32                 | 34                   | 2.0  |
| June 4    | 34                 | 35                   | 1.0  |

**Total MAE:** 1.0
{: .block-highlight }

{% endtab %}

{% tab app Weather App Prediction Error When First 27 Data Points Are Taken %}

```python
import pandas as pd
import numpy as np
from sklearn.metrics import mean_absolute_error

# Load the data from the Excel file
file_path = 'Copy of FoDS Weather Data.xlsx'
df = pd.read_excel(file_path)

# Extract the actual temperatures and dates
actual_temperatures = df['Actual_Temperature']
dates = df['Date']
predicted_temp_day1 = df['Predicted_Temperature_Day1']
predicted_temp_day2 = df['Predicted_Temperature_Day2']
predicted_temp_day3 = df['Predicted_Temperature_Day3']

# Find the index for June 25
june_25_index = dates[dates == '2024-06-25'].index[0]

# Actual temperatures for June 26, June 27, June 28
actual_temp_june_26_to_28 = actual_temperatures[june_25_index+1:june_25_index+4]

# Predicted temperatures for June 26, June 27, June 28 from June 25
predicted_temp_june_26_to_28 = pd.Series([
    predicted_temp_day1[june_25_index],
    predicted_temp_day2[june_25_index],
    predicted_temp_day3[june_25_index]
])

# Calculate the mean absolute error (MAE)
mae_june_26 = mean_absolute_error([actual_temp_june_26_to_28.iloc[0]], [predicted_temp_june_26_to_28.iloc[0]])
mae_june_27 = mean_absolute_error([actual_temp_june_26_to_28.iloc[1]], [predicted_temp_june_26_to_28.iloc[1]])
mae_june_28 = mean_absolute_error([actual_temp_june_26_to_28.iloc[2]], [predicted_temp_june_26_to_28.iloc[2]])

# Calculate the total mean absolute error (MAE)
total_mae_june_26_to_28 = mean_absolute_error(actual_temp_june_26_to_28, predicted_temp_june_26_to_28)

# Display the results
results_june_25 = {
    'Date': ['June 26', 'June 27', 'June 28'],
    'Actual Temperature': actual_temp_june_26_to_28.values,
    'Predicted Temperature': predicted_temp_june_26_to_28.values,
    'MAE': [mae_june_26, mae_june_27, mae_june_28]
}

results_df_june_25 = pd.DataFrame(results_june_25)
results_df_june_25.loc['Total MAE'] = ['', '', '', total_mae_june_26_to_28]

print(results_df_june_25)
```
>| Date      | Actual Temperature | Predicted Temperature | MAE  |
|-----------|--------------------|----------------------|------|
| June 26   | 32                 | 32                   | 0.000000  |
| June 27   | 29                 | 29                   | 0.000000  |
| June 28   | 30                 | 28                   | 2.000000  |

**Total MAE:** 0.666667
{: .block-highlight }

{% endtab %}

{% endtabs %}

### Key Observations:

- ARIMA outperformed the weather app in short-term forecasts.
- Increasing training data from 3 to 27 points reduced MAE for both ARIMA and the weather app.
- Longer-term forecasts introduced greater errors, emphasizing the importance of periodic model retraining.

{% include figure.liquid loading="eager" path="assets/img/meanError.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
From this graph, it is concluded that increasing the training data size from 3 data points to 27 data points significantly improves the accuracy of both ARIMA model predictions and weather app predictions. The ARIMA model shows a notable reduction in MAE, though the weather app still maintains a lower error overall.


{% include figure.liquid loading="eager" path="assets/img/lagError.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
The Lag Error analysis further indicates that the ARIMA model's prediction errors exhibit noticeable fluctuations across different lag values, suggesting that while the model improves with more training data, there is still some degree of error autocorrelation. In contrast, the weather app predictions appear to be more stable across lag values.