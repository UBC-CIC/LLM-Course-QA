FROM python:3.9

# Switch working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN apt update && apt install -y build-essential

# install the dependencies and packages in the requirements file
RUN pip install --no-cache-dir -r /app/requirements.txt

EXPOSE 5000

CMD ["flask", "run"]
