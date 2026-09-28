Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  post '/auth/register', to: 'users#create'

  resources :events, only: [:index, :show]
  resources :blogs, only: [:index, :show]
  resources :projects, only: [:index, :show]
  resources :project_proposals, only: [:index, :show]

  
  #example route
  get 'auth/me', to: 'users#me'
end


