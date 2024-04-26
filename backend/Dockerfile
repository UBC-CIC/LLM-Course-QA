FROM python:3.9

# Switch working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN apt update && apt install -y build-essential && apt-get install -y postgresql postgresql-contrib

ENV PGDATA=/var/lib/postgresql/data
RUN mkdir -p $PGDATA && chown -R postgres:postgres $PGDATA
VOLUME $PGDATA

RUN service postgresql start && \
    su - postgres -c "psql -c \"ALTER USER postgres WITH PASSWORD 'postgres';\"" && \
    su - postgres -c "createdb course-qa -O postgres"

# install the dependencies and packages in the requirements file
RUN pip install --no-cache-dir -r /app/requirements.txt

EXPOSE 5000

CMD service postgresql start && flask run
