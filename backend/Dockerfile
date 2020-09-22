FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y
WORKDIR /app

COPY Gemfile .
COPY Gemfile.lock .

RUN gem install bundler
RUN bundle install

COPY . .

EXPOSE 3001
CMD ['bundle', 'exec', 'rails', 's','-p', '3001', '-b' ,'0.0.0.0']