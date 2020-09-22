Rails.application.routes.draw do
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/rooms/:uri', to: 'rooms#show'
  post '/rooms', to: 'rooms#create'
end
